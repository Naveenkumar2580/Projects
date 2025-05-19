import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  getRedirectResult,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where, Timestamp } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase with error handling
let app;
try {
  // Check if an app already exists
  app = initializeApp(firebaseConfig);
} catch (error: any) {
  // If the error is due to the app already existing, get the existing app
  if (error.code === 'app/duplicate-app') {
    console.info("Firebase app already exists, retrieving existing app");
  } else {
    console.error("Firebase initialization error:", error);
  }
}

// Get auth and firestore instances safely
const auth = getAuth();
const db = getFirestore();

// Authentication functions with better error handling
export const loginWithEmail = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error("Login error:", error.code, error.message);
    let errorMessage = "Failed to sign in. Please check your credentials.";
    
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = "Invalid email or password. Please try again.";
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = "Too many failed login attempts. Please try again later.";
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = "Network error. Please check your connection and try again.";
    }
    
    const enhancedError = new Error(errorMessage);
    enhancedError.cause = error;
    throw enhancedError;
  }
};

export const registerWithEmail = async (email: string, password: string) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error("Registration error:", error.code, error.message);
    let errorMessage = "Failed to create account.";
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "This email is already registered. Try logging in instead.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Password is too weak. Please use a stronger password.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Invalid email address. Please check and try again.";
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = "Network error. Please check your connection and try again.";
    } else if (error.code === 'auth/configuration-not-found') {
      errorMessage = "Authentication service is temporarily unavailable. Please try again later.";
    }
    
    const enhancedError = new Error(errorMessage);
    enhancedError.cause = error;
    throw enhancedError;
  }
};

export const logout = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const handleRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      console.log(`Welcome to IN5NITE YIELDS, ${result.user.displayName || result.user.email}!`);
    }
  } catch (error) {
    console.error("Error during redirect login:", error);
  }
};

export const updateUserProfile = async (displayName: string, photoURL?: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user logged in");
  }
  
  try {
    await updateProfile(user, {
      displayName,
      photoURL: photoURL || user.photoURL
    });
    
    // Force a refresh to ensure we get the updated profile
    await user.reload();
    return user;
  } catch (error) {
    console.error("Update profile error:", error);
    throw new Error("Failed to update profile. Please try again.");
  }
};

export const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user logged in");
  }
  
  try {
    await sendEmailVerification(user);
    return true;
  } catch (error) {
    console.error("Email verification error:", error);
    throw new Error("Failed to send verification email. Please try again later.");
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error: any) {
    console.error("Reset password error:", error);
    let errorMessage = "Failed to send password reset email.";
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = "No account found with this email address.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Invalid email address. Please check and try again.";
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = "Too many requests. Please try again later.";
    }
    
    throw new Error(errorMessage);
  }
};

// Firestore functions with better error handling and transaction processing
export const saveFeedback = async (feedback: string, userId?: string) => {
  try {
    // First try to save to our PostgreSQL database through the API
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: feedback, userId: userId || 'anonymous' }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.id;
      }
    } catch (apiError) {
      console.warn("API error, falling back to Firebase:", apiError);
    }
    
    // Fallback to Firebase if API fails
    const feedbackRef = await addDoc(collection(db, "feedback"), {
      content: feedback,
      userId: userId || "anonymous",
      createdAt: serverTimestamp()
    });
    return feedbackRef.id;
  } catch (error) {
    console.error("Error adding feedback:", error);
    throw new Error("Failed to submit feedback. Please try again.");
  }
};

export const saveContactMessage = async (message: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) => {
  try {
    // First try to save to our PostgreSQL database through the API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.id;
      }
    } catch (apiError) {
      console.warn("API error, falling back to Firebase:", apiError);
    }
    
    // Fallback to Firebase if API fails
    const messageRef = await addDoc(collection(db, "contactMessages"), {
      ...message,
      createdAt: serverTimestamp()
    });
    return messageRef.id;
  } catch (error) {
    console.error("Error adding contact message:", error);
    throw new Error("Failed to send message. Please try again.");
  }
};

export const saveOrder = async (order: {
  service: string;
  price: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  requirements?: string;
  userId?: string;
}) => {
  try {
    // First try to save to our PostgreSQL database through the API
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.id;
      }
    } catch (apiError) {
      console.warn("API error, falling back to Firebase:", apiError);
    }
    
    // Fallback to Firebase if API fails
    const orderData = {
      ...order,
      status: "pending",
      createdAt: serverTimestamp()
    };
    
    const orderRef = await addDoc(collection(db, "orders"), orderData);
    return orderRef.id;
  } catch (error) {
    console.error("Error adding order:", error);
    throw new Error("Failed to submit order. Please try again.");
  }
};

export { auth, db, onAuthStateChanged };
export type { User };
