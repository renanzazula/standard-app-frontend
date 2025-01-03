import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  private csrfToken: string | null = null;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Attach CSRF token to outgoing POST, PUT, DELETE requests
    if (['POST', 'PUT', 'DELETE'].includes(request.method) && this.csrfToken) {
      request = request.clone({
        setHeaders: {
          'X-CSRF-TOKEN': this.csrfToken,
        },
      });
    }

    // Handle the response to capture CSRF token
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const newCsrfToken = event.headers.get('X-CSRF-TOKEN');
          if (newCsrfToken) {
            this.csrfToken = newCsrfToken; // Store the token for subsequent requests
          }
        }
      })
    );
  }
}
