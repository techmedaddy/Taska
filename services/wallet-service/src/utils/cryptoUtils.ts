import crypto from "crypto";

export class CryptoUtils {
  static generateKeyPair() {
    return crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
  }

  static hashData(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  static signData(data: string, privateKey: string): string {
    const sign = crypto.createSign("SHA256");
    sign.update(data);
    return sign.sign(privateKey, "hex");
  }

  static verifySignature(data: string, signature: string, publicKey: string): boolean {
    const verify = crypto.createVerify("SHA256");
    verify.update(data);
    return verify.verify(publicKey, signature, "hex");
  }
}
