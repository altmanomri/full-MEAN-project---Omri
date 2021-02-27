import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { Task } from "../task";
import { Subscription } from 'rxjs';
import { UsersUtilsService } from '../users-utils.service';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  updateUser: any;

  @Input()
  task: Task;

  @Input()
  tasks: Task;

  @Input()
  todoIndex: number;

  @Input()
  markTodoComplete: any;

  newTask = new Task();
  sub: Subscription;

  constructor(private utils: UsersUtilsService) { }

  markCompleted(ind: number)
  {
    this.task.completed = true
    this.user.tasks[ind].completed = true
    this.sub = this.utils.updateUser(this.user._id, this.user)
      .subscribe(data => console.log('yeah'))

    window.location.reload()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() 
  {
    if (this.sub) 
    {
      this.sub.unsubscribe();
    }
  }
}
