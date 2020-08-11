import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormVisible = true;
  email: string;
  password: string;
  name: string;


  constructor(public userService: UserService) {

  }

  ngOnInit(): void {
  }

  makeSignInVisible() {
    this.signInFormVisible = true;
  }

  makeSignUpVisible() {
    this.signInFormVisible = false;
  }

  signIn() {
    console.log("user signIn");
    this.userService.login(this.email, this.password);
    this.email = "";
    this.password = "";
  }


  signUp() {
    console.log("Name in component: ", this.name);
    this.userService.signup(this.email, this.password, this.name);
    this.email = "";
    this.password = "";
    this.name = ""; 
  }
}