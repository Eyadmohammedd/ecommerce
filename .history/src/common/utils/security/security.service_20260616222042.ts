import { BadRequestException, Injectable } from '@nestjs/common';
import { SALT_ROUND } from 'src/config/config';
import { compare, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityService {
  constructor(private readonly configService: ConfigService) {}
  generateHash = async ({
    plaintext,
    salt = number(this.configService.get<string>('SALT_ROUND') ?? '10'),
  }: {
    plaintext: string;
    salt?: number;
  }): Promise<string> => {
    return await hash(plaintext, salt);
  };

  compareHash = async ({
    plaintext,
    cipherText,
  }: {
    plaintext: string;
    cipherText: string;
  }): Promise<boolean> => {
    return await compare(plaintext, cipherText);
  };
}
export const generateEncryption = (plaintext: string) => {
  if (!plaintext) {
    throw new BadRequestException('No data to encrypt');
  }

  const encByte = process.env.ENC_BYTE;
  if (!encByte) {
    throw new BadRequestException('Encryption key not configured');
  }

  const encIvLength = parseInt(process.env.ENC_IV_LENGTH ?? '16');
  const iv = crypto.randomBytes(encIvLength);

  // Convert hex string to Buffer for AES-256 (32 bytes)
  const keyBuffer = Buffer.from(encByte, 'hex');

  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
};

export const generateDecryption = (cipherText: string) => {
  if (!cipherText) {
    throw new BadRequestException('No cipher text provided');
  }

  const encByte = process.env.ENC_BYTE;
  if (!encByte) {
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
  const keyBuffer = Buffer.from(encByte, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};
