import "dotenv/config";

import crypto from 'crypto';

const ENCRYPTION_KEY=process.env.DB_MASTER_ENCRYPTION_KEY||'';
const IV_LENGTH = 16;

export function encrypt(text:string): string{
  const iv = crypto.randomBytes(IV_LENGTH);
  const encKey = Buffer.from(ENCRYPTION_KEY,'hex');
  const cipher = crypto.createCipheriv('aes-256-gcm',encKey, iv);

  let encrypted = cipher.update(text,'utf8','hex');
  encrypted+=cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}