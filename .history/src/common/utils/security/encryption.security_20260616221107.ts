import crypto from 'crypto';
import { ENC_BYTE, ENC_IV_LENGTH } from '../../../config/config';
import { BadRequestException } from '@nestjs/common';

export const generateEncryption = (plaintext: string) => {
  if (!plaintext) {
    throw new BadRequestException('No data to encrypt');
  }

  if (!ENC_BYTE) {
    throw new BadRequestException('Encryption key not configured');
  }

  const iv = crypto.randomBytes(ENC_IV_LENGTH);

  // Convert hex string to Buffer for AES-256 (32 bytes)
  const keyBuffer = Buffer.from(ENC_BYTE, 'hex');

  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
};

export const generateDecryption = (cipherText: string) => {
  if (!cipherText) {
    throw new BadRequestException('No cipher text provided');
  }

  if (!ENC_BYTE) {
    throw new BadRequestException('Encryption key not configured');
  }

  const parts = cipherText.split(':');

  if (parts.length !== 2) {
    throw new BadRequestException('Invalid encryption format');
  }

  const ivHex = parts[0];
  const encrypted = parts[1];

  if (!ivHex || !encrypted) {
    throw new BadRequestException('Invalid encryption parts');
  }

  const iv = Buffer.from(ivHex, 'hex');

  // Convert hex string to Buffer for AES-256 (32 bytes)
  const keyBuffer = Buffer.from(ENC_BYTE, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
