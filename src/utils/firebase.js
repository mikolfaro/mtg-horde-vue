import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyDhtEQ0V4mYaxhRoR_E2WaHlp4SVSvwF_U",
  authDomain: "mtg-horde-5b6a1.firebaseapp.com",
  projectId: "mtg-horde-5b6a1",
  storageBucket: "mtg-horde-5b6a1.appspot.com",
  messagingSenderId: "776834971634",
  appId: "1:776834971634:web:33ae04d3d573f3441c5d6b"
})

export const db = firebase.firestore()
export const auth = firebase.auth()

if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "test"
) {
  // db.useEmulator('http://localhost:8090')
  // auth.useEmulator('http://localhost:9099/');
}
