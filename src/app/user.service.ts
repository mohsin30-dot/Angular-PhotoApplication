import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { User } from './User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{

  user: Observable<firebase.User>;

  canActivate(): boolean {

    if (this.firebaseAuth.auth.currentUser != null) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  constructor(private firebaseAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService) {
    this.user = firebaseAuth.authState;

    this.user.subscribe(
      userInfo => {
        console.log("userInfo: ", userInfo);
        this.savedIdToken(userInfo);
      }
    );
  }


  savedIdToken(firebaseUser: firebase.User) {
    firebaseUser.getIdToken().then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        console.log("id token value: ", localStorage.getItem('userIdToken'));
      }
    )
  }

  signup(email: string, password: string, name: string) {
    this.messageService.clearMessages();
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.registerUser(email, name);
        console.log("Name in service: ", name);
        this.savedIdToken(value.user);
        this.messageService.clearMessages();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.messageService.newMessage(err.message);
      });
  }

  registerUser(email: string, name: string) {
    var user: User = {
      emailAddress: email,
      id: "",
      name: name,
      profilePhotoUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
    };

    this.http.post(environment.API_BASE_URL + "users/register", user)
      .subscribe(response => {
        this.router.navigate(['albums/recent']);
      });
    console.log("Name in registration ", name);
  }

  login(email: string, password: string) {
    this.messageService.clearMessages();
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.savedIdToken(value.user);
        this.router.navigate(['albums/recent']);
        this.messageService.clearMessages();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.messageService.newMessage(err.message);
      });
  }

  logout() {
    this.router.navigate(['login']);
    this.firebaseAuth
      .auth
      .signOut();
    localStorage.clear();
  }

  getCurrentUserProfile() {
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "users/me", { headers });
  }

    getHeaders() {
      var headers = { 'idToken': localStorage.getItem('userIdToken') };
      return headers;
    }

}


