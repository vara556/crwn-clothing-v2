import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbXbI9NF2LmSdb5pg_bqQaqncA2SqEIb0",
  authDomain: "crown-clothing-db-289ff.firebaseapp.com",
  projectId: "crown-clothing-db-289ff",
  storageBucket: "crown-clothing-db-289ff.appspot.com",
  messagingSenderId: "174974404060",
  appId: "1:174974404060:web:a3d862e5d2def401c6fb19",
  measurementId: "G-NF8BQ1734D"
};


const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});



export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserProfileDocument = async (userAuth) => {
  //if (!userAuth) return;
  console.log(userAuth);
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();


    try {
      await setDoc(userDocRef, { displayName, email, createdAt });

    } catch (error) {
      console.log(error);
    }
  }
  return userDocRef;
};