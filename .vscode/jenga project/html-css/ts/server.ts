import express, { Request, Response } from "express";
import session from "express-session";
import axios from "axios";
import { getJengaBearerToken } from "./token";
import { generateJengaSignature } from "./signature";
import { transactions } from "./schema";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema: { transactions } });

declare module "express-session" {
  interface SessionData {
    organizationId?: string;
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

import cors from "cors";

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true,
  }),
);

const JENGA_TRANSFER_URL =
  process.env.JENGA_TRANSFER_URL ||
  "https://uat.jengapay.co.ke/transaction-api/v3/ns/transactions/transfer";

import registerRouter from "./register";

app.use("/", registerRouter);

//saves organizationId into req.session
app.post("/api/session/org", async (req, res) => {
  const organizationId = String(req.body?.organizationId || "").trim();
  if (!organizationId) {
    return res.status(400).json({ error: "organizationId is required" });
  }

  req.session.organizationId = organizationId;

  return res.json({ ok: true, organizationId });
});

app.post("/api/sendmoney", async (req: Request, res: Response) => {
  try {
    const { amount, currency, recipientAccount, recipientName } = req.body;

    const orgId = String(
      req.session.organizationId || req.body?.organizationId || "",
    ).trim();

    if (!orgId) {
      return res.json("error");
    }

    if (!recipientAccount || !amount) {
      return res
        .status(400)
        .json({ error: "Mobile number and amount are required" });
    }

    req.session.organizationId = orgId;

    const transferPayload = {
      source: {
        countryCode: "KE",
        name: "nancy's boutique",
        accountNumber: process.env.JENGA_ACCOUNT_NUMBER || "",
      },
      destination: {
        type: "mobile",
        countryCode: "KE",
        accountNumber: recipientAccount,
        name: recipientName,
        mobileNetworkCode: "MPESA",
      },
      transfer: {
        currencyCode: currency || "KES",
        amount: amount.toString(),
        reference: "TRANFERS",
        description: "Payment to a salesperson",
      },
    };

    const payloadString = JSON.stringify(transferPayload);

    const accessToken = await getJengaBearerToken(orgId);

    const signature = generateJengaSignature(payloadString);

    const jengaResponse = await axios.post(
      JENGA_TRANSFER_URL,
      transferPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
          merchantcode: process.env.JENGA_MERCHANT_CODE || "",
        },
      },
    );

    const responseData = jengaResponse.data;

    const [savedTransaction] = await db
      .insert(transactions)
      .values({
        transactionId: responseData.transactionId || null,
        transactionReference: transferPayload.transfer.reference,
        transactionStatus: responseData.transactionStatus || "PROCESSING",
        amount: transferPayload.transfer.amount,
        currency: transferPayload.transfer.currencyCode,
        receiverName: responseData.receiverName || "Unknown",
      })
      .returning();

    return res.status(200).json({
      success: true,
      message: "Transaction saved successfully",
    });
  } catch (error: any) {
    console.error("Send money endpoint error");
    return res.json({
      success: false,
      error: " server error ",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server running on 3000");
});

//what is returned json object,,like:
// {
//   "status": "success",
//   "message": "Transaction submitted successfully",
//   "data": {
//     "transactionId": "FT25091ABCDE",
//     "transactionReference": "YOUR_CUSTOM_REF_123",
//     "transactionStatus": "PROCESSING",
//     "amount": 1500.00,
//     "currency": "KES",
//     "charges": 15.00,
//     "receiverName": "John Doe",
//     "completionEstimate": "2026-06-06T10:35:00Z"
//   }
// }
