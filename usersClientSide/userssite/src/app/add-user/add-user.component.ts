import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UsersUtilsService } from '../users-utils.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: User = new User();
  sub1: Subscription;

  constructor(private utils: UsersUtilsService, private router: Router) { }

  checkValidEmail(email: String)
  {
    if (email?.indexOf('@') == -1 || email?.indexOf('.') == -1) 
    {
      return false;
    }
    return true;
  }

  addUser() 
  {
    // check if user enter name and email
    if (this.newUser.name?.length > 0 && this.newUser.email?.length > 0) 
    {
      let vaildEmail = this.checkValidEmail(this.newUser.email)
      if (!vaildEmail) 
      {
        alert('Please enter a valid email')
      }
      this.sub1 = this.utils.addUser(this.newUser)
        .subscribe(status => alert(status))
      window.location.reload()
    }
    else {
      alert("Please enter name AND email")
    }
  }
 // clicking cancel button will navigate back to the page without making any changes
  cancel() {
    this.router.navigate([""])
  }
  ngOnInit(): void {

  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
