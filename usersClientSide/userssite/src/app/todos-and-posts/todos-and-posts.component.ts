import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { UsersUtilsService } from '../users-utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { Post } from "../post";
import { Task } from "../task";

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos-and-posts',
  templateUrl: './todos-and-posts.component.html',
  styleUrls: ['./todos-and-posts.component.css']
})
export class TodosAndPostsComponent implements OnInit {

  sub: Subscription; //update user
  sub1: Subscription; // get user
  sub2: Subscription; // get posts, tasks
  user: User = new User();
  userId: string = '';


  tasks: Task[];
  posts: Post[];

  addTaskFlag: Boolean = false;
  public addPostFlag: boolean = false;
  public newPost: Post = new Post();

  newTask: Task = {
    title: "",
    completed: false
  }
                                                                        
  constructor(private utils: UsersUtilsService, private route: ActivatedRoute, private router: Router) { }
  //update user with the new task after pushing it and reloading the page
  addTask() 
  {
    if (this.newTask.title !== "") 
    {
      this.user.tasks.push(this.newTask)
      this.tasks = this.user.tasks
      this.changeFlag();
      this.updateUser();
      window.location.reload()
    }
  }
  // x button to close the add user component
  closeBtn() 
  {
    let counter = 0;
    this.router.navigate(['']);
    let nameId = `userBox${this.user._id}`
    let name = document.getElementById(nameId)
    if (name) name.style.backgroundColor = "white"
  }
 //update user with the new post after pushing it and reloading the page
  addPost() 
  {
    if (this.newPost.title) 
    {
      this.user.posts.push(this.newPost)
      this.changePostFlag()
      this.updateUser()
    }
    else 
    {
      alert('Please enter title')
    }
  }

  changeFlag() 
  {
    this.addTaskFlag = !this.addTaskFlag;
  }

  changePostFlag() 
  {
    this.addPostFlag = !this.addPostFlag
  }

  updateUser() 
  {
    this.sub = this.utils.updateUser(this.user._id, this.user)
      .subscribe(data => alert(data))
  }

  ngOnInit() {

    this.sub1 = this.route.params.subscribe((param) => {
      this.userId = param['userId'];
      this.sub2 = this.utils.getUser(this.userId)
        .subscribe(data => {
          this.user = data;
          this.tasks = this.user.tasks
          this.posts = this.user.posts
        });
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }
}
