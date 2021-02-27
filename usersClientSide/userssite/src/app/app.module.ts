import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RouterModule , Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { TodosAndPostsComponent } from './todos-and-posts/todos-and-posts.component';
import { TaskComponent } from './task/task.component';
import { PostComponent } from './post/post.component';
import { AddUserComponent } from './add-user/add-user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

const appRoutes : Routes = [
{path : "TodosAndPostsComponent/:userId", component : TodosAndPostsComponent} ,
{path : "AddUser", component : AddUserComponent} ,
]

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    UsersListComponent,
    UserComponent,
    TodosAndPostsComponent,
    TaskComponent,
    PostComponent,
    AddUserComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    MatButtonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
