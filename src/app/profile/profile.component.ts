import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../User';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe(
      response => {
        this.user = <User>response;
        console.log("got the user profile", this.user);
      }
    );
  }

  

 
 

}