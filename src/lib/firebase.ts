/**
 * Firebase Configuration Placeholder
 * 
 * IMPORTANT: Replace these placeholder values with your actual Firebase config
 * You can find these values in your Firebase Console:
 * 1. Go to Firebase Console (https://console.firebase.google.com)
 * 2. Select your project
 * 3. Click on the gear icon (Settings) > Project settings
 * 4. Scroll down to "Your apps" section
 * 5. Copy the firebaseConfig object
 */

// Firebase configuration - REPLACE WITH YOUR OWN VALUES
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional
};

/**
 * Firebase Firestore Collections Structure
 * 
 * Collection: users
 * Document ID: Firebase UID
 * Fields:
 *   - email: string
 *   - phone: string
 *   - displayName: string
 *   - walletBalance: number (in paise/cents)
 *   - winningCredits: number (in paise/cents)
 *   - isBanned: boolean
 *   - isAdmin: boolean
 *   - createdAt: timestamp
 *   - updatedAt: timestamp
 * 
 * Collection: tournaments
 * Document ID: auto-generated
 * Fields:
 *   - game: 'BGMI' | 'FREE_FIRE'
 *   - entryFee: number (in rupees)
 *   - maxPlayers: number
 *   - prizePerPlayer: number (default 16)
 *   - matchDateTime: timestamp
 *   - status: 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'CANCELLED'
 *   - roomId: string | null
 *   - roomPassword: string | null
 *   - roomReleased: boolean
 *   - rules: string
 *   - createdAt: timestamp
 *   - createdBy: string (admin UID)
 * 
 * Collection: tournament_registrations
 * Document ID: auto-generated
 * Fields:
 *   - tournamentId: string
 *   - oderId: string
 *   - paymentId: string
 *   - paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
 *   - slotNumber: number
 *   - joinedAt: timestamp
 *   - isDisqualified: boolean
 *   - disqualificationReason: string | null
 * 
 * Collection: tournament_results
 * Document ID: auto-generated
 * Fields:
 *   - tournamentId: string
 *   - userId: string
 *   - position: number
 *   - prizeAmount: number
 *   - kills: number
 *   - createdAt: timestamp
 *   - createdBy: string (admin UID)
 * 
 * Collection: withdrawal_requests
 * Document ID: auto-generated
 * Fields:
 *   - userId: string
 *   - amount: number
 *   - status: 'PENDING' | 'APPROVED' | 'REJECTED'
 *   - upiId: string
 *   - createdAt: timestamp
 *   - processedAt: timestamp | null
 *   - processedBy: string | null (admin UID)
 *   - rejectionReason: string | null
 * 
 * Collection: transactions
 * Document ID: auto-generated
 * Fields:
 *   - userId: string
 *   - type: 'DEPOSIT' | 'WITHDRAWAL' | 'PRIZE' | 'ENTRY_FEE' | 'REFUND'
 *   - amount: number
 *   - description: string
 *   - referenceId: string | null (tournament/withdrawal ID)
 *   - createdAt: timestamp
 */

// Placeholder functions - Replace with actual Firebase SDK implementation
export const initializeFirebase = () => {
  console.log('Firebase initialization placeholder - implement with actual Firebase SDK');
  // import { initializeApp } from 'firebase/app';
  // import { getAuth } from 'firebase/auth';
  // import { getFirestore } from 'firebase/firestore';
  // const app = initializeApp(firebaseConfig);
  // export const auth = getAuth(app);
  // export const db = getFirestore(app);
};
