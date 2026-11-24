import { pgTable, serial, text,numeric,varchar,boolean, timestamp } from 'drizzle-orm/pg-core';

export const JengaConsumerConfig = pgTable('JengaConsumerConfig', {
  id: serial('id').primaryKey(),
  organizationId: text('username').notNull(),
    merchantCode: varchar("merchant_code", { length: 50 }).notNull(),
   
    consumerSecret: text("consumer_secret").notNull(),//encrypted
    apiKey: text("api_key").notNull(),//encrypted
    isActive: boolean("is_active").default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
 // environment: varchar("environment", { length: 20 }).notNull(),
 activeToken: text("active_token"),
 tokenExpireTime: numeric().default("1").notNull()//in milliseconds since epoch time
 
});




export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  transactionId: text('transaction_id').unique(), 
  transactionReference: text('transaction_reference').notNull(),
  transactionStatus: text('transaction_status').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  receiverName: text('receiver_name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});