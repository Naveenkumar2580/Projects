import dotenv from 'dotenv';  // Import dotenv to manage environment variables
import { initializeApp } from 'firebase/app';  // Import Firebase initialization
import { getDatabase } from 'firebase/database';  // Firebase Realtime Database

// Load environment variables from the .env file
dotenv.config();

// Ensure necessary environment variables are set
if (
  !process.env.FIREBASE_API_KEY ||
  !process.env.FIREBASE_AUTH_DOMAIN ||
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_DATABASE_URL
) {
  throw new Error('Environment variables are missing. Ensure all required variables are set in the .env file.');
}

// Firebase Configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,  // Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

// Export Firebase App and Realtime Database for usage in other parts of your project
export { app, database };