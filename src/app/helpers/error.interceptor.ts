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
          this.cleanUpSession();
          this.authenticationService.logout();
          location.reload();
        } else if (err.status === 403) {
          // Handle 403 Forbidden
          console.warn('403 Forbidden: Redirecting to login...');
          this.cleanUpSession();
          this.router.navigate(['/login'], { queryParams: { reason: 'forbidden' } });
        }

        // Transform the error into the desired structure
        const transformedError = this.transformError(err, request.url);
        console.error('Transformed Error:', transformedError);

        // Return the transformed error
        return throwError(() => transformedError);
      })
    );
  }

  private transformError(error: HttpErrorResponse, target: string): any {

    return {
      target, // Target URL of the failed request
      reference: this.generateReferenceId(), // Unique reference ID
      timestamp: new Date().toISOString(), // Current timestamp
      details: [
        {
          target: 'rootCause',
          code: error.error.code || error.name, // Use backend error code or error name
          message: error.error.message || error.message || 'An error occurred', // Use backend message or fallback
        },
      ],
    };
  }

  private generateReferenceId(): string {
    // Generate a UUID for reference
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private cleanUpSession(): void {
    console.log('Cleaning up session: Clearing localStorage...');
    localStorage.clear();
  }
}
