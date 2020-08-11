
import { Component } from '@angular/core';
import { UserService } from './user.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyPhotoApplication';

  email: String;
  password: String;

  constructor(public userService: UserService, public messageService: MessageService) {

  }

  signOut() {
    this.userService.logout();
    this.email = "";
    this.password = "";
  }

  clearMessages() {
    this.messageService.clearMessages();
  }

}
