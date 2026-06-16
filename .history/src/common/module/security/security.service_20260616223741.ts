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
    return hash(plaintext, salt);
  };

  compareHash = async ({
    plaintext,
    cipherText,
  }: {
    plaintext: string;
    cipherText: string;
  }): Promise<boolean> => {
    return compare(plaintext, cipherText);
  };

  generateEncryption = async (plaintext: string): Promise<string> => {
  const iv = crypto.randomBytes(
    Number(this.configService.get<string>("ENC_IV_LENGTH")),
  );

  const ENC_KEY = this.configService.get<string>("ENC_KEY") as string;
let
  const cipherIvVector = crypto.createCipheriv(
    "aes-256-cbc",
    ENC_KEY,
    iv,
  );

  let cipherText = cipherIvVector.update(
    plaintext,
    "utf-8",
    "hex",
  );

  cipherText += cipherIvVector.final("hex");

  // console.log({ iv, cipherIvVector, cipherText, ivv: iv.toString("hex") });

//   return `${iv.toString("hex")}:${cipherText}`;
// };
//     let encrypted = cipher.update(plaintext, 'utf8', 'hex');
//     encrypted += cipher.final('hex');

//     return `${iv.toString('hex')}:${encrypted}`;
//   };

  generateDecryption = (cipherText: string): string => {
    if (!cipherText) {
      throw new BadRequestException('No cipher text provided');
    }

    const encByte = this.configService.get<string>('ENC_BYTE');

    if (!encByte) {
      throw new BadRequestException('Encryption key not configured');
    }

    const parts = cipherText.split(':');

    if (parts.length !== 2) {
      throw new BadRequestException('Invalid encryption format');
    }

    const [ivHex, encrypted] = parts;

    if (!ivHex || !encrypted) {
      throw new BadRequestException('Invalid encryption parts');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const keyBuffer = Buffer.from(encByte, 'hex');

    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      keyBuffer,
      iv,
    );

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  };
}