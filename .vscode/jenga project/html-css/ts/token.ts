import axios from "axios";
import { eq } from "drizzle-orm";
// import { JengaConsumerConfig } from './schema';
import { decrypt } from "./decryption";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export interface JengaCredentials {
  merchantCode: string;
  consumerSecret: string;
  apiKey: string;
}

//different jenga versions use diff naming conventiions
interface JengaTokenResponse {
  access_token?: string;
  accessToken?: string;
  token_type: string;
  expires_in: number;
}

//will return a promise of the token
export async function getJengaBearerToken(orgId: string): Promise<string> {
  const cleanOrgId = orgId.trim();
  if (!cleanOrgId) {
    throw new Error("organizationId required");
  }

  const [config] = await db
    .select()
    .from(schema.JengaConsumerConfig)
    .where(eq(schema.JengaConsumerConfig.organizationId, cleanOrgId));

  if (!config) {
    throw new Error("No Jenga data for orgId");
  }

  const credentials: JengaCredentials = {
    merchantCode: config.merchantCode,
    consumerSecret: decrypt(config.consumerSecret),
    apiKey: decrypt(config.apiKey),
  };

  const tokenUrl =
    process.env.JENGA_AUTH_URL ||
    "https://uat.jengapay.co.ke/identity/api/v3/token";

  const response = await axios.post<JengaTokenResponse>(
    tokenUrl,
    {
      merchantCode: credentials.merchantCode,
      consumerSecret: credentials.consumerSecret,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Key": credentials.apiKey,
      },
    },
  );

  const token = response.data.accessToken || response.data.access_token;
  if (!token) {
    throw new Error("Jenga token response did not include an access token");
  }

  return token;
}
