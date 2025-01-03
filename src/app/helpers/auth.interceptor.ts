import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private csrfToken: string | null = null;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the request is a login, intercept and handle the CSRF token
    if (request.url.endsWith('/authentication/login')) {
      return next.handle(request).pipe(
        tap((event) => {
          if (event instanceof HttpResponse && event.headers.has('X-CSRF-TOKEN')) {
            // Extract and store the CSRF token
            this.csrfToken = event.headers.get('X-CSRF-TOKEN');
            localStorage.setItem('csrfToken', this.csrfToken || '');
          }
        })
      );
    }

    // For other requests, add the CSRF token if available
    if (this.csrfToken) {
      request = request.clone({
        setHeaders: { 'X-CSRF-TOKEN': this.csrfToken },
        withCredentials: true,
      });
    }

    return next.handle(request);
  }
}
