import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLZGar5YZywIoHyWPzYmt4Jd06XzauDck",
  authDomain: "gahre-ka-zayka-login.firebaseapp.com",
  projectId: "gahre-ka-zayka-login",
  storageBucket: "gahre-ka-zayka-login.appspot.com",
  messagingSenderId: "694597450702",
  appId: "1:694597450702:web:39415a2fbf45bc9942499f",
  measurementId: "G-D99DJ0LHLG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
