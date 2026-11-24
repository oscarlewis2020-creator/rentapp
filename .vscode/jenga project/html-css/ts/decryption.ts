import "dotenv/config";

import crypto from 'crypto';

const ALGORITHM='aes-256-gcm';

export function decrypt(payload:string): string {
  const secretkey=process.env.DB_MASTER_ENCRYPTION_KEY;
  if(!secretkey){
    throw new Error('missing ECRYPTION KEY')
  }

  const [ivHex,authTagHex,encryptedHex]=payload.split(':');
  if(!ivHex||!authTagHex||!encryptedHex){
    throw new Error('Invalid payload')
  }

  const key = Buffer.from(secretkey,'hex');
  const iv = Buffer.from(ivHex,'hex');
 const authTag = Buffer.from(authTagHex,'hex');

 const decipher = crypto.createDecipheriv(ALGORITHM,key,iv);
 decipher.setAuthTag(authTag);

 const decrypted = Buffer.concat([
  decipher.update(Buffer.from(encryptedHex,'hex')),
  decipher.final(),
 ]);

 return decrypted.toString('utf-8')
}