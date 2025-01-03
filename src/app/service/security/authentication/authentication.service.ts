import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiPublicUrl}/authentication/login`,
        { username, password },
        {
          observe: 'response', // Get full HTTP response
          withCredentials: true, // Include credentials
        }
      )
      .pipe(
        map((response) => {
          if (response.status === 200) {
            // Handle successful login
            const expiration = new Date().getTime() + 30 * 60 * 1000; // 30 minutes session timeout
            localStorage.setItem('sessionExpiration', new Date(expiration).toISOString());

            const csrfToken = response.headers.get('X-CSRF-TOKEN');
            if (csrfToken) {
              localStorage.setItem('csrfToken', csrfToken);
              localStorage.setItem('currentUser', JSON.stringify(response.body));
            } else {
              throw new Error('CSRF token not provided');
            }

            return response.body;
          } else {
            throw new Error(`Unexpected response status: ${response.status}`);
          }
        }),
        catchError((error) => {
          console.error('Login error:', error);
          throw new Error(error);
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
