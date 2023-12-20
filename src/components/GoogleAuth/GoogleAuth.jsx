import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnCnXqQl_V_QzfHn5ZoUH7MsTyD4ti5E4",
  authDomain: "inhouse-c77d7.firebaseapp.com",
  projectId: "inhouse-c77d7",
  storageBucket: "inhouse-c77d7.appspot.com",
  messagingSenderId: "843304820458",
  appId: "1:843304820458:web:f7796a32eb99e728060193",
  measurementId: "G-FCKWPFSSY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

// Set up a listener to watch for the user's authentication state changes
auth.onAuthStateChanged((user) => {
  // Check if the user is signed in
  if (user) {
    // Check if the user's email includes the required domain
    const allowedDomain = "techjays.com"; // Change this to your desired domain
    if (user.email.includes(`@${allowedDomain}`)) {
      // User is authenticated and has the correct email domain
      console.log("User is authenticated and has the correct email domain");
    } else {
      // User is not allowed to access the application
      console.log("User is not allowed to access this application");
      // You can sign out the user if you want
      auth.signOut();
    }
  }
})

export {auth,provider};