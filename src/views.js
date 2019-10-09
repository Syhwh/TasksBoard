import $ from 'jquery'
const home=require ('./templates/home.hbs');
const loginUser=require('./templates/loginForm.hbs');
const signUpUser =require('./templates/signUpForm.hbs');
const mainBoard =require('./templates/mainBoard.hbs');
const showTask=require('./templates/task.hbs');
const showTasks=require('./templates/tasks.hbs');

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

const showTasksView =(task)=>{
  
   // $('#main').html(mainBoard);
    $('#tasks').html( showTask(task));
   
   // console.log(task)
}

export {
    homeView,
    signUpView,
    mainBoardView,
    showTasksView}