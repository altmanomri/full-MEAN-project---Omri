import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { UsersUtilsService } from '../users-utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Task } from '../task';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  userData: User;

  @Input()
  allUsers: User[];



  userid: number = 0;
  user: User[];
  public tasksCompleted:boolean 
  userColor: any;

  
  isValid: Boolean;
  isDataExist: Boolean = false;
  isCompleted: Boolean;
  isTPExist: Boolean = false;
  isBackgroundOrange: Boolean = false;
  displayTasks : Boolean = false;
  dataFromChild: Task[];
  userPosition : Number;
  
  sub1: Subscription;
  sub2: Subscription;

  constructor(private utils: UsersUtilsService, private ar: ActivatedRoute, private router: Router) { }

  // creating other data div
  createDataDiv() {
    this.isDataExist = true;
  }
  // handle tasks from child
  handleDataChange(task: Task[]) {

  }
  checkTasks() 
  {
    let allTasksCompleted = this.taskCompletedOrNot(this.userData.tasks)
    // check if one task is false
    if (allTasksCompleted) {
      this.userColor = "green"
      this.isCompleted = true
    }
    // if all completed color green
    else {
      this.userColor = "red"
      this.isCompleted = false
    }
  }

  markTodoComplete(id: number) {
    let listTodo = this.userData.tasks[id];
    listTodo.completed = true;
  }
  taskCompletedOrNot(tasks: Task[]) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed == false) return false;
    }
    return true;
  }
  destroyDataDiv() {
    this.isDataExist = !this.isDataExist;
  }
  // change the background color of the user in use
  changeBackgroundColor(id:String, color:string){
    let idNameN = `userBox${id}`
    let nameN = document.getElementById(idNameN)
    if(nameN ){
      nameN.style.backgroundColor=color
    }
  }
  // change all users background to white accept the one in use
  changeBackground(id:String){
    for (let i of this.allUsers){
      let idName = `userBox${i._id}`
      let name = document.getElementById(idName)
    if(name ){
      name.style.backgroundColor="white";
    }
  }
  this.changeBackgroundColor(id, "orange")
}
  // creating todo and post component and change users background-color
  createTPComp(userid : String) {
    this.displayTasks = !this.displayTasks;
    this.changeBackground(userid)
    this.router.navigate(['TodosAndPostsComponent/' + this.userData._id]) 
  }
  //delete user
  deleteUser() {
    this.sub1 = this.utils.deleteUser(this.userData._id)
      .subscribe(data => {
        alert(data)
        window.location.reload()
      })
  }
  //update user
  UpdateUser() {
    this.sub2 = this.utils.updateUser(this.userData._id, this.userData)
      .subscribe(data => alert(data))
    window.location.reload()
  }
  
  CheckFormValidation(isValid: boolean) {
    if (this.isValid == false) {
      alert("Name must be entered")
    }
  }

  ngOnInit(): void {
    this.checkTasks()
    this.tasksCompleted =  this.userData.tasks.some(task => !task.completed);
    
  }

  ngOnDestroy() {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}