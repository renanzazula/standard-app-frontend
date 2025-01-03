import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MyPrivateHttpClient {

  isAuthenticate = false;
  csrfToken: string | null = null;

  constructor(private http: HttpClient) {
  }

  get(url: string): any {
    return this.http.get(`${environment.apiPrivateUrl}` + url, {
      headers: new HttpHeaders({ 'X-CSRF-TOKEN': this.csrfToken }),
      withCredentials: true,
    });
  }

  post(url: string, data: any): any {
    return this.http.post(`${environment.apiPrivateUrl}` + url, data, {
      headers: new HttpHeaders({ 'X-CSRF-TOKEN': this.csrfToken }), withCredentials: true,
    }).pipe(map((response: any) => {
      // Save token and CSRF token for future requests
      if (response) {
        this.isAuthenticate = true;
        this.csrfToken = response.csrfToken || null;
        if (this.csrfToken) {
          localStorage.setItem('csrfToken', this.csrfToken);
        }
      }
      return response;
    }));
  }

  put(url: string, data: any): any {
    return this.http.put(`${environment.apiPrivateUrl}` + url, data, {
      headers: new HttpHeaders({ 'X-CSRF-TOKEN': this.csrfToken }), withCredentials: true,
    }).pipe(map((response: any) => {
      // Save token and CSRF token for future requests
      if (response) {
        this.isAuthenticate = true;
        this.csrfToken = response.csrfToken || null;
        if (this.csrfToken) {
          localStorage.setItem('csrfToken', this.csrfToken);
        }
      }
      return response;
    }));
  }

  delete(url: string, data: any): any {
    return this.http.delete(`${environment.apiPrivateUrl}` + url, {
      headers: new HttpHeaders({ 'X-CSRF-TOKEN': this.csrfToken }), withCredentials: true,
    }).pipe(map((response: any) => {
      // Save token and CSRF token for future requests
      if (response) {
        this.isAuthenticate = true;
        this.csrfToken = response.csrfToken || null;
        if (this.csrfToken) {
          localStorage.setItem('csrfToken', this.csrfToken);
        }
      }
      return response;
    }));
  }

}
