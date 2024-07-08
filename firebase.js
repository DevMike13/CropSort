import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBuNjoS-a5ksbnZQd1FQH2IPkQAadcDdnc",
    databaseURL: "https://crops-sort-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "crops-sort",
    // appId: '1:955424197580:android:83d97a9164a3ec3b556b69'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
