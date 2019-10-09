import $ from 'jquery';
import * as firebase from 'firebase';
import "firebase/auth";
import * as database from './database';
const views = require('../views');

//const  initApp = ()=> {
    firebase.auth().onAuthStateChanged(function (user) {   
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            views.mainBoardView();
            database.getTasks(uid);
        } else {
           // alert ('is not logged in')
        }
    });
//}

const signUpUser =()=>{
    const userName =$('#inputUser').val();
    const userEmail = $('#inputEmail').val();
    const userPassword = $('#inputPassword').val();
    if (userEmail.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (userPassword.length < 4) {
        alert('Please enter a password.');
        return;
    }
 
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
    .then( ()=>{ 
        const userId=firebase.auth().currentUser.uid;// take the Id   
        database.setUsers(userId,userName,userEmail)
        signOutUser(); 
    } )    
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);

    });
  
}


const  loginUser =()=> {
    
        var userEmail = $('#inputEmail').val();
        var userPassword = $('#inputPassword').val();

        if (userEmail.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (userPassword.length < 4) {
            alert('Please enter a password.');
            return;
        }
     
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
         .catch(function (error) {
    
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
               
            }
            console.log(error);           
        });
      
  
}

const signOutUser=()=>{
    firebase.auth().signOut().then(function() {
        // Sign-out successful.    
        views.homeView();
        console.log('logout function')
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
}

const currentUser= ()=> {
  return  firebase.auth().currentUser.uid
};
export  { 
   // initApp,
    signUpUser,
    loginUser,
    signOutUser,
    currentUser
}