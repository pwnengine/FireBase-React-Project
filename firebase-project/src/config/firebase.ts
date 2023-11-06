// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyBWj13euEzPrlI5C5N5wNe7K6gU9OCvFZI",

  authDomain: "swagproject-a234b.firebaseapp.com",

  projectId: "swagproject-a234b",

  storageBucket: "swagproject-a234b.appspot.com",

  messagingSenderId: "527479092457",

  appId: "1:527479092457:web:b5ba9ae3e3804d9964ec78"


 // measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(config);

/* these will be used in the loginWithPopup firebase function or other functions */
// export to our login component
export const auth = getAuth(app);
// export to our login component
export const provider = new GoogleAuthProvider();
// export to our login component
export const db = getFirestore(app);