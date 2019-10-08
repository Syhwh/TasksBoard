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
        } else {
           // alert ('is not logged in')
        }
    });
//}

const signUpUser =()=>{
    const user =$('#inputUser').val();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
 
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( ()=>{ 
        const userId=firebase.auth().currentUser.uid;// take the Id   
        database.setUsers(userId,name,email)
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
    
        var email = $('#inputEmail').val();
        var password = $('#inputPassword').val();

        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
     
        firebase.auth().signInWithEmailAndPassword(email, password)
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

const currentUser= firebase.auth().currentUser;
export  { 
   // initApp,
    signUpUser,
    loginUser,
    signOutUser,
    currentUser
}