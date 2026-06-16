import { Injectable } from "@nestjs/common";





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