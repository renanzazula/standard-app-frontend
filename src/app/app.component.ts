import {Component, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {UserService} from "./service/user/user.service";
import {User} from "./model/user";
import {AuthenticationService} from "./service/security/authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users: User[] = [];
  isAuthenticated: boolean;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
    this.isLoggedIn();
  }

  Logout() {
    this.authenticationService.logout();
  }

  isLoggedIn() {
    this.isAuthenticated = this.authenticationService.isLoggedIn();
  }

}
