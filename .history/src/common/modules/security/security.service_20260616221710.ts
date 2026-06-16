import { Injectable } from "@nestjs/common";
import { SALT_ROUND } from "src/config/config";
import { hash } from "zod/v4/mini";





@Injectable()
export class SecurityService {
    constructor() {}
 generateHash = async ({
  plaintext,
  salt = SALT_ROUND,
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