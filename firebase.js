import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAlbqkf0KUAamNDcQ_0S5MrfIkyb-ovfdg",
  authDomain: "proyectowebfinal-76298.firebaseapp.com",
  projectId: "proyectowebfinal-76298",
  storageBucket: "proyectowebfinal-76298.appspot.com",
  messagingSenderId: "604624143778",
  appId: "1:604624143778:web:3b0bb26496bf2a0e475efb"
};

initializeApp(firebaseConfig);
export const storage = getStorage();
export const firestore = getFirestore();
export const auth = getAuth();
