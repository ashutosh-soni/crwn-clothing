import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBJG0maf9Lc6XTu0wkLicrJt9hSQsxol9I",
    authDomain: "crwn-db-38aef.firebaseapp.com",
    databaseURL: "https://crwn-db-38aef.firebaseio.com",
    projectId: "crwn-db-38aef",
    storageBucket: "crwn-db-38aef.appspot.com",
    messagingSenderId: "414377348003",
    appId: "1:414377348003:web:acc711b5f4c963f2cd6816",
    measurementId: "G-34MWHM53CE"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;