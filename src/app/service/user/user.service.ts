import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getCurrentUser(): Observable<User> {
    const currentUserData = localStorage.getItem('currentUser');

    console.log(currentUserData);

    if (!currentUserData) {
      // Redirect to login page if no user is found
      console.warn('No current user found in localStorage. Redirecting to login...');
      this.router.navigate(['/login']);

    }

    try {
      // Parse the JSON and extract the username
      const { username: user } = JSON.parse(currentUserData);

      if (user) {
        return this.http
          .get(`${environment.apiPrivateUrl}/users/${user}`, {withCredentials: true})
          .pipe(
            map((response: any) => {
              // Transform the HTTP response into a User object
              return {
                id: response.id,
                username: response.username,
                firstName: response.firstName,
                lastName: response.lastName,
                accountNonExpired: response.accountNonExpired,
                accountNonLocked: response.accountNonLocked,
                credentialsNonExpired: response.credentialsNonExpired,
                enabled: response.enabled,
                authorities: response.authorities || [],
              } as User;
            }),
            catchError((error) => {
              console.error('Error fetching current user:', error);
              this.router.navigate(['/login']);
              return throwError(() => error);
            })
          );
      } else {
        throw new Error('Username not found in current user data');
      }
    } catch (error) {
      console.error('Error parsing current user data:', error);
      this.router.navigate(['/login']);
      return throwError(() => new Error('Invalid current user data'));
    }
  }

}
