import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class SecurityService {
  constructor(private readonly configService: ConfigService) {}

  generateHash = async ({
    plaintext,
    salt = Number(this.configService.get<string>('SALT_ROUND') ?? 10),
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
// eslint-disable-next-line @typescript-eslint/require-await
  generateEncryption = async (
    plaintext: string,
  ): Promise<string> => {
    if (!plaintext) {
      throw new BadRequestException('No plaintext provided');
    }

    const ivLength = Number(
      this.configService.get<string>('ENC_IV_LENGTH') ?? 16,
    );

    const iv = crypto.randomBytes(ivLength);

    const encKey = this.configService.get<string>('ENC_KEY');

    if (!encKey) {
      throw new BadRequestException('Encryption key not configured');
    }

    const keyBuffer = Buffer.from(encKey, 'hex');

    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      keyBuffer,
      iv,
    );

    let encrypted = cipher.update(
      plaintext,
      'utf8',
      'hex',
    );

    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  };

  generateDecryption = (
    cipherText: string,
  ): string => {
    if (!cipherText) {
      throw new BadRequestException(
        'No cipher text provided',
      );
    }

    const encKey = this.configService.get<string>('ENC_KEY');

    if (!encKey) {
      throw new BadRequestException(
        'Encryption key not configured',
      );
    }

    const parts = cipherText.split(':');

    if (parts.length !== 2) {
      throw new BadRequestException(
        'Invalid encryption format',
      );
    }

    const [ivHex, encrypted] = parts;

    const iv = Buffer.from(ivHex, 'hex');
    const keyBuffer = Buffer.from(encKey, 'hex');

    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      keyBuffer,
      iv,
    );

    let decrypted = decipher.update(
      encrypted,
      'hex',
      'utf8',
    );

    decrypted += decipher.final('utf8');

    return decrypted;
  };
}