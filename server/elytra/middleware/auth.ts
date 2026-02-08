import { Request, Response, NextFunction } from "express";
import { admin } from "../services/firebase";

export type AuthedRequest = Request & { firebase?: admin.auth.DecodedIdToken };

export async function requireFirebaseAuth(req: AuthedRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.header("authorization") || "";
        const match = authHeader.match(/^Bearer (.+)$/i);

        if (!match) {
            return res.status(401).json({
                code: "UNAUTHORIZED",
                message: "Bearer token required"
            });
        }

        const idToken = match[1];
        const decoded = await admin.auth().verifyIdToken(idToken, true);
        req.firebase = decoded;
        next();
    } catch (error: any) {
        console.error("Firebase Auth Error:", error);
        return res.status(401).json({
            code: "INVALID_TOKEN",
            message: "Authentication verification failed"
        });
    }
}
