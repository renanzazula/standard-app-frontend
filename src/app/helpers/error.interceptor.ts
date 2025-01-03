import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/security/authentication/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Handle 401 Unauthorized
          console.warn('401 Unauthorized: Logging out user...');
          this.cleanUpSession(); // Clear localStorage
          this.authenticationService.logout();
          location.reload(); // Reload the app to clear state
        } else if (err.status === 403) {
          // Handle 403 Forbidden
          console.warn('403 Forbidden: Redirecting to login...');
          this.cleanUpSession(); // Clear localStorage
          this.router.navigate(['/login'], { queryParams: { reason: 'forbidden' } }); // Redirect to login
        }

        // Safely extract and log error message
        const error = this.getErrorMessage(err);
        console.error('Error intercepted:', error);

        return throwError(() => new Error(error));
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return error.error.message || 'Client-side error occurred';
    } else {
      // Server-side error
      return error.error.message || error.message || 'Server error occurred';
    }
  }

  private cleanUpSession(): void {
    console.log('Cleaning up session: Clearing localStorage...');
    localStorage.clear(); // Remove all localStorage data
  }
}
