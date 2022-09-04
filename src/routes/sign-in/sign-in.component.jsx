import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import {
  auth,
  signInWithGooglePopup,
  createUserProfileDocument,
  signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  useEffect(async() => {
    const response = await getRedirectResult(auth);
    if(response){

      const userDocRef = await  createUserProfileDocument(response.user);
    }
  }, [])
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
   const userDocRef = await  createUserProfileDocument(user);
  };
  const logGoogleUserWithRedirect = async () => {
    const {user} = await signInWithGoogleRedirect();
   const userDocRef = await  createUserProfileDocument(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
