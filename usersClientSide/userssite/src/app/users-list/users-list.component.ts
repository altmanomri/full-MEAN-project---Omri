import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UsersUtilsService } from '../users-utils.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  sub1: Subscription;
  sub2: Subscription;
  users: User[] = [];
  specUser: User = {};
  fullUserData: User[];
  filterUsers: User[];
  isAddExist: Boolean = false;
  usersList: any;
  searchInput: string;
  hideTP: false;

  constructor(private utils: UsersUtilsService, private http: HttpClient, private router: Router) { }
  //create new user component
  createNewUserComp() {
    this.router.navigate(["AddUser"]);
    this.cancelBackgroundColor()
  }


  async ngOnInit() {
    this.sub1 = await this.utils.getAllUsers()
      .subscribe(data => {
        this.users = data;
        this.filterUsers = data;
        if (this.users.length > 0) {
          this.isAddExist = false;
        }
        else {
          this.isAddExist = true;
        }
      });

  }
  search(text: string): any {
    let filter = this.filterUsers.filter((user) =>
      user.name?.toLowerCase().includes(text) || user.email?.toLowerCase().includes(text))
    this.users = filter
  }
  //when pressing search, user's orange background color will become white and TasksPosts component will disappear 
  inputPress() {
    this.router.navigate([""])
    this.cancelBackgroundColor()
  }
  cancelBackgroundColor() {
    for (let i of this.users) {
      let nameId = `userBox${i._id}`
      let name = document.getElementById(nameId)
      if (name) name.style.backgroundColor = "white"
    }
  }


  ngOnDestroy() {
    this.sub1.unsubscribe();

  }
}
