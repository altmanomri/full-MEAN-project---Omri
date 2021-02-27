import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class UsersUtilsService {

  url : string = "http://localhost:8000/api/users";
  constructor(private http : HttpClient) { }

  getAllUsers()
  {
    return this.http.get<User[]>(this.url)
  }
  getUser(id : String)
  {
    return this.http.get<User>(this.url + "/" + id)
  }
  addUser(usr : User)
  {
    return this.http.post(this.url, usr)
  }
  updateUser(id : String, usr : User)
  {
    return this.http.put(this.url + "/" + id, usr)
  }
  deleteUser(id : String)
  {
    return this.http.delete(this.url + "/" + id)
  }
  

}
