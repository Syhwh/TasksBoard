import $ from 'jquery'
const home=require ('./templates/home.hbs');
const loginUser=require('./templates/loginForm.hbs');
const signUpUser =require('./templates/signUpForm.hbs');
const mainBoard =require('./templates/mainBoard.hbs')

const homeView =()=>{
    $('#main').html(home);
    $('#homeForm').html(loginUser);
}

const signUpView=()=>{
    $('#homeForm').html(signUpUser);
}
const mainBoardView=()=>{
    $('#main').html(mainBoard);
}
export {homeView,signUpView,mainBoardView}