import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { NETWORK_URL } from "../links";

const saveData = (keys) => {
  firebase.initializeApp(keys);
  const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
  const user = firebase.auth().currentUser;
  user
    .getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
      window.localStorage.setItem("idToken", idToken);
      window.localStorage.setItem("expiration", expirationDate);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

const getFirebaseKeys = async () => {
  const keys = await axios.get(`${NETWORK_URL}/seller/keys`);
  return keys.data;
};

export const checkAuthTimeout = (expirationDate) => {
  setTimeout(() => {
    logoutUser();
  }, expirationDate * 1000);
};

export const setCurrentAuthState = () => {
  const idToken = window.localStorage.getItem("idToken");
  if (idToken === undefined) {
    return logoutUser();
  } else {
    const expirationDate = new Date(localStorage.getItem("expiration"));
    if (expirationDate <= new Date()) {
      return logoutUser();
    } else {
      const remainingTime =
        (expirationDate.getTime() - new Date().getTime()) / 1000;
      return checkAuthTimeout(remainingTime);
    }
  }
};

export const loginUser = async (email, password) => {
  const keys = await getFirebaseKeys();
  firebase.initializeApp(keys);
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // console.log(user);
      saveData(keys);
    })
    .catch((error) => {
      // console.log("login error");
      alert("Something went wrong")
      window.location.reload()
      // ..
    });
};

export const logoutUser = async () => {
  const keys = await getFirebaseKeys();
  firebase.initializeApp(keys);
  window.localStorage.removeItem("idToken");
  window.localStorage.removeItem("expiration");
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      // console.log("firebase error");
      alert("Something went wrong")
      window.location.reload()
    });
};
