import crypto from "crypto";
import { ENC_IV_LENGTH, ENC_KEY } from "../../../config/config";
import { BadRequestException } from "@nestjs/common";

const getEncryptionKey = (): Buffer => {
  if (!ENC_KEY) {
    throw new BadRequestException("Encryption key not configured");
  }

  if (ENC_KEY.length !== 32) {
    throw new BadRequestException(
      "Encryption key must be a 32-byte hex value for AES-256-CBC",
    );
  }

  return ENC_KEY;
};

export const generateEncryption = async (
  plaintext: string,
): Promise<string> => {
  if (!plaintext) {
    throw new BadRequestException("No data to encrypt");
  }

  if (!ENC_BYTE) {
    throw new BadRequestException("Encryption key not configured");
  }

  const iv = crypto.randomBytes(ENC_IV_LENGTH);
  const key = getEncryptionKey();

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
};

export const generateDecryption = async (
  cipherText: string,
): Promise<string> => {
  if (!cipherText) {
    throw new BadRequestException("No cipher text provided");
  }

  const key = getEncryptionKey();

  const parts = cipherText.split(":");

  if (parts.length !== 2) {
    throw new BadRequestException("Invalid encryption format");
  }

  const ivHex = parts[0];
  const encrypted = parts[1];

  if (!ivHex || !encrypted) {
    throw new BadRequestException("Invalid encryption parts");
  }

  const iv = Buffer.from(ivHex, "hex");
  const key = getEncryptionKey();

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
