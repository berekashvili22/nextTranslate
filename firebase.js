import firebase from 'firebase';

const firebaseConfig = {
         apiKey: "AIzaSyAIn-b89LJciCak4dNJN-bPGY01ZgZya3M",
         authDomain: "translate-2-62c4d.firebaseapp.com",
         projectId: "translate-2-62c4d",
         storageBucket: "translate-2-62c4d.appspot.com",
         messagingSenderId: "170011617359",
         appId: "1:170011617359:web:dc98acf5ee27048a16e23a"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }