import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBuNjoS-a5ksbnZQd1FQH2IPkQAadcDdnc",
    databaseURL: "https://crops-sort-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "crops-sort",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
