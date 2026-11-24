
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';


export function generateJengaSignature(payloadData: string): string {
  try {
    
    const keyPath = path.resolve(__dirname, '../privatekey.pem');
    const privateKey = fs.readFileSync(keyPath, 'utf8');


    const sign = crypto.createSign('SHA256');
    sign.update(payloadData);
    sign.end();

    
    const signature = sign.sign(privateKey, 'base64');
    return signature;
  } catch (error) {
    console.error( error);
    throw error;
  }
}