import admin, { ServiceAccount } from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Parse the service account key from environment variables
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the environment variables.");
}

const serviceAccount: ServiceAccount = JSON.parse(serviceAccountKey);

// Initialize the Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Load the database URL from environment variables
  });
}

// Get the Realtime Database instance
const db = getDatabase();

export { admin, db };