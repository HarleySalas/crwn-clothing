import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDkgCTOXJMjt8Q11HWbskjTRQql00sqWpE",
  authDomain: "crwn-db-44bdb.firebaseapp.com",
  databaseURL: "https://crwn-db-44bdb.firebaseio.com",
  projectId: "crwn-db-44bdb",
  storageBucket: "",
  messagingSenderId: "936882497150",
  appId: "1:936882497150:web:3a033b3e1a3d070d165a2f",
  measurementId: "G-RQMKV35PRW"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (
  userAuth,
  additionalData,
  cartItems
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
      let cart = cartItems || [];
      await transferCartToNewUser(userAuth.uid, cart);
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

export const transferCartToNewUser = async (userId, cartItems) => {
  const cartsRef = firestore.collection("carts").where("userId", "==", userId);
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const cartDocRef = firestore.collection("carts").doc();
    await cartDocRef.set({ userId, cartItems: cartItems });
    return;
  } else {
    return;
  }
};

export const getUserCartRef = async userId => {
  const cartsRef = firestore.collection("carts").where("userId", "==", userId);
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const cartDocRef = firestore.collection("carts").doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
