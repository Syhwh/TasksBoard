import * as firebase from 'firebase';
import "firebase/firestore";
import  firebaseConfig from './configuration';


const initApp =firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const usersCollection = db.collection('users');
const tasksCollection = db.collection('task');

const setUsers=(userId,userName,userEmail)=>{
    const data = {
        userId,
        userName,
        userEmail,
        createAt: Date.now()
    }
    usersCollection.add(data);
}

const setTask=(userId,taskName)=>{
    const data = {
        userId,
        taskName,
        createAt: Date.now()
    }
    tasksCollection.add(data);
}



export {
    initApp,
    setUsers,
    tasksCollection,
    setTask
}