import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInAnonymously, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Check if we're in demo mode (no Firebase config)
const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'your_firebase_api_key';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'demo-app-id',
};

let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let googleProvider: any = null;

if (!isDemoMode) {
  // Initialize Firebase only if not in demo mode
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
}

// Demo mode authentication functions
const createDemoUser = (isAnonymous: boolean = true, displayName?: string) => ({
  uid: 'demo-user-' + Date.now(),
  isAnonymous,
  displayName: displayName || null,
  email: isAnonymous ? null : 'demo@example.com',
  photoURL: null,
});

// Authentication functions
export const signInAsGuest = async () => {
  if (isDemoMode) {
    // Return a promise that resolves with a demo user
    return Promise.resolve({
      user: createDemoUser(true)
    });
  }
  return signInAnonymously(auth);
};

export const signInWithGoogle = async () => {
  if (isDemoMode) {
    // Return a promise that resolves with a demo Google user
    return Promise.resolve({
      user: createDemoUser(false, 'Demo User')
    });
  }
  return signInWithPopup(auth, googleProvider);
};

export const logOut = async () => {
  if (isDemoMode) {
    return Promise.resolve();
  }
  return signOut(auth);
};

export { auth, db, storage, googleProvider, isDemoMode };
export default app;
