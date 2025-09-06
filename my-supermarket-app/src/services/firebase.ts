import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from './config';

// Initialize Firebase app once and reuse
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
