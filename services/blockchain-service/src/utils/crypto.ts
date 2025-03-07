import crypto from "crypto";

/**
 * Generate a SHA-256 hash of the given data.
 */
export function hashSHA256(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Generate an HMAC signature using a secret key.
 */
export function generateHMAC(data: string, secret: string): string {
    return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

/**
 * Generate an RSA key pair for encryption and signing.
 */
export function generateKeyPair() {
    return crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem" }
    });
}
