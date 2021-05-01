var firebaseConfig = {
  apiKey: "AIzaSyANoGiOO6d9BS94p986Vil-rXNCnDTqimI",
  authDomain: "yaak-aa6a6.firebaseapp.com",
  projectId: "yaak-aa6a6",
  storageBucket: "yaak-aa6a6.appspot.com",
  messagingSenderId: "514784856584",
  appId: "1:514784856584:web:c88b00e08ea58dd6681fbd",
  measurementId: "G-Q3H21MCTC4",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
