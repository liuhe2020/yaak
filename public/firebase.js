var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'yaak-aa6a6.firebaseapp.com',
  projectId: 'yaak-aa6a6',
  storageBucket: 'yaak-aa6a6.appspot.com',
  messagingSenderId: '514784856584',
  appId: process.env.APP_ID,
  measurementId: 'G-Q3H21MCTC4',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
