
import {cert, getApp, getApps, initializeApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import { auth } from './client';

function initializeFirebaseAdmin() {
  const apps = getApps();

  if (apps.length === 0) {
    initializeApp({
        credential:cert({
            clientEmail : process.env.FIREBASE_CLIENT_EMAIL,
            privateKey : process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            projectId : process.env.FIREBASE_PROJECT_ID,
        })
    })
  } 

  return {
    auth: getAuth(),
    db: getFirestore(),
  }

}

export const { auth, db } = initializeFirebaseAdmin();