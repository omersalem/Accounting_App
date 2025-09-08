// Centralized config for Firebase.
// Best practice in Expo: read from app.json -> expo.extra, with env fallback for non-Expo contexts (e.g., tests).
import Constants from 'expo-constants';

type AppExtra = {
  FB_API_KEY?: string;
  FB_AUTH_DOMAIN?: string;
  FB_PROJECT_ID?: string;
  FB_STORAGE_BUCKET?: string;
  FB_MESSAGING_SENDER_ID?: string;
  FB_APP_ID?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as AppExtra;

export const firebaseConfig = {
  apiKey: extra.FB_API_KEY || process.env.FB_API_KEY || "",
  authDomain: extra.FB_AUTH_DOMAIN || process.env.FB_AUTH_DOMAIN || "",
  projectId: extra.FB_PROJECT_ID || process.env.FB_PROJECT_ID || "",
  storageBucket: extra.FB_STORAGE_BUCKET || process.env.FB_STORAGE_BUCKET || "",
  messagingSenderId: extra.FB_MESSAGING_SENDER_ID || process.env.FB_MESSAGING_SENDER_ID || "",
  appId: extra.FB_APP_ID || process.env.FB_APP_ID || "",
};
