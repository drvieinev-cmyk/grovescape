import admin from "firebase-admin";

if (!admin.apps.length) {
  // Use GOOGLE_APPLICATION_CREDENTIALS for production
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export { admin };
