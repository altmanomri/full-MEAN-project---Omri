import { Component, Input, OnInit } from '@angular/core';
import {Post} from '../post'
import { User } from '../user';
import { UsersUtilsService } from '../users-utils.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post : Post;

  @Input()
  user : User;

  constructor(private utils : UsersUtilsService) { }

  ngOnInit(): void {
    
  }
  
}
