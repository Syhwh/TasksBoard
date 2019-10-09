import $ from 'jquery';
import * as database from './database/database';
import * as auth from './database/authentication'

// initialized app
database.initApp;

//views
const views = require('./views.js')

views.homeView();

$('#main').on('click', '#createAccount', views.signUpView);
$('#main').on('click', '#backToLogin', views.homeView);
$('#main').on('click', '#loginUser', auth.loginUser);
$('#main').on('click', '#userSignUp', auth.signUpUser);
$('#main').on('click', '#signOutUser', auth.signOutUser);

$('#main').on('keypress', '#taskName', (e) => {
    const task = $(e.currentTarget).val()
    const userID = auth.currentUser()
    if (e.keyCode == 13) {
        database.setTask(userID, task);
        $(e.currentTarget).val('')
        database.getTasks(userID);
    }
})

