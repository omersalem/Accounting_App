import { app } from './firebase';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  IdTokenResult,
} from 'firebase/auth';
// Optional Firestore fallback for role doc (users/{uid})
import { getDB } from './firestore';
import { doc, getDoc } from 'firebase/firestore';

export type UserRole = 'Admin' | 'Staff';

const auth = getAuth(app);

// Subscribe to auth state changes
export function onAuthStateChangedListener(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Sign in with email/password
export async function signInWithEmailPassword(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// Sign out current user
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

// Get current user (if available)
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Resolve role from custom claims, fallback to users/{uid}.role in Firestore
export async function getUserRole(user: User): Promise<UserRole | null> {
  try {
    const token: IdTokenResult = await user.getIdTokenResult(true);
    const claimRole = (token.claims as Record<string, unknown>).role;
    if (claimRole === 'Admin' || claimRole === 'Staff') {
      return claimRole;
    }
  } catch {
    // ignore and try fallback
  }

  // Fallback to Firestore users/{uid}
  try {
    const db = getDB();
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data() as { role?: string };
      if (data.role === 'Admin' || data.role === 'Staff') return data.role;
    }
  } catch {
    // ignore
  }
  return null;
}