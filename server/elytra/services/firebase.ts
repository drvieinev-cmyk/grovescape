import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (serviceAccount) {
    try {
      const config = JSON.parse(serviceAccount);
      admin.initializeApp({
        credential: admin.credential.cert(config),
      });
      console.log("🔥 Firebase Admin initialized via FIREBASE_SERVICE_ACCOUNT");
    } catch (error) {
      console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT:", error);
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
  } else {
    // Falls back to GOOGLE_APPLICATION_CREDENTIALS
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    console.log("🔥 Firebase Admin initialized via applicationDefault");
  }
}

export { admin };
