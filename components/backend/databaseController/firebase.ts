import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FirebaseApp, FirebaseOptions } from 'firebase/app';

// Configuración de Firebase usando variables de entorno
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase solo si no está inicializado
let app: FirebaseApp | null = null;

if (!app) {
  app = initializeApp(firebaseConfig);
  console.log("Firebase inicializado correctamente");
} else {
  console.log("Firebase ya estaba inicializado");
}

// Exportar Firestore
export const db = getFirestore(app);
