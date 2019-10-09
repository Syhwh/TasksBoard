import * as firebase from 'firebase';
import "firebase/firestore";
import firebaseConfig from './configuration';
const views = require('../views');


const initApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const usersCollection = db.collection('users');
const tasksCollection = db.collection('tasks');

const setUsers = (userId, userName, userEmail) => {
    const data = {
        userId,
        userName,
        userEmail,
        createAt: Date.now()
    }
    usersCollection.add(data);
}

const setTask = (userId, taskName) => {
    const data = {
        userId,
        taskName,
        createAt: Date.now()
    }
    tasksCollection.add(data);
}

const getTasks = (userID) => {
    var data=[];
     tasksCollection.where('userId', '==', userID).orderBy('createAt').get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(doc => {
                 data.push(doc.data())
              
            });
            views.showTasksView({data})
        })
        .catch(err => {
            console.log('Error getting documents', err);
            console.log(err)
        });

}


export {
    initApp,
    setUsers,
    tasksCollection,
    setTask,
    getTasks
}