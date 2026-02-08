import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

export function encrypt(text: string, key: Buffer): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    
    const tag = cipher.getAuthTag().toString("hex");
    
    // Return iv:tag:content
    return `${iv.toString("hex")}:${tag}:${encrypted}`;
}

export function decrypt(encryptedData: string, key: Buffer): string {
    const [ivHex, tagHex, content] = encryptedData.split(":");
    
    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(content, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return decrypted;
}

/**
 * Derives a per-user 256-bit key from the Master Key and Device Salt.
 */
export function deriveKey(masterKey: string, salt: string): Buffer {
    return crypto.scryptSync(masterKey, salt, 32);
}
