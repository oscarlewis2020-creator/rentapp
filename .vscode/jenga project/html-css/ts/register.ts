import "dotenv/config";
import { Request, Response, Router } from "express";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
// import { eq } from "drizzle-orm";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// dotenv.config();

import { JengaConsumerConfig } from "./schema";
import { encrypt } from "./encryption";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema: { JengaConsumerConfig } });

const router: Router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { organizationId, merchantCode, consumerSecret, apiKey } = req.body;

    if (!organizationId || !merchantCode || !consumerSecret || !apiKey) {
      return res.status(400).json({
        success: false,
        error: "Missing some required input",
      });
    }

    const jengaResponse = await fetch(
      "https://uat.finserve.africa/authentication/api/v3/authenticate/merchant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          merchantCode,
          consumerSecret,
        }),
      },
    );

    const jengaData = await jengaResponse.json();

    //.ok is a built in boolean for fetch responses to check if the http succeseded
    if (!jengaResponse.ok || !jengaData.accessToken) {
      return res.status(400).json({
        success: false,
        error: "failed to get token",
        details: jengaData,
      });
    }

    const realAccessToken = jengaData.accessToken;
    const expiresInString = jengaData.expiresIn;
    const expireTimestamp = expiresInString
      ? new Date(expiresInString)
      : new Date(Date.now() + 3600 * 1000);

    //.getTime() is for getting the epoch time out of date object made by new Date
    const expiryTime = expireTimestamp.getTime() - Date.now();

    const encConsumerSecret = encrypt(consumerSecret);
    const encApiKey = encrypt(apiKey);

    const [insertedData] = await db
      .insert(JengaConsumerConfig)
      .values({
        organizationId,
        merchantCode,
        consumerSecret: encConsumerSecret,
        apiKey: encApiKey,
        activeToken: realAccessToken,
        tokenExpireTime: expiryTime.toString(),
      })
      .returning(); // Returns an array, destructuring the first element

    return res.status(201).json({
      success: true,
      message: " successfull",
      // data: {
      //   id: insertedData?.id,
      //   organizationId: insertedData?.organizationId,
      //   merchantCode: insertedData?.merchantCode,
      //   activeToken: insertedData?.activeToken,
      //   tokenExpireTime: insertedData?.tokenExpireTime,
      //   isActive: insertedData?.isActive,
      //   createdAt: insertedData?.createdAt,
      // }
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      error: "Internal server error ",
    });
  }
});

export default router;

