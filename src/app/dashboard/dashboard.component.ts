import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  currentUser: User | null = null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        console.log('Current User:', this.currentUser);
      }, error: (error) => {
        console.error('Failed to load user:', error);
      },
    });
  }
}
