import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of,} from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  // modify the return type to properly use the full response
  login(payload): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post('https://reqres.in/api/login', payload, {headers: headers})
  }

  getAuthToken() {
    return localStorage.getItem('reqres-token');
  }

  setAuthToken(token) {
    localStorage.setItem('reqres-token', token);
  }

  isAuthenticated() {
    return !!this.getAuthToken();
  }

  getUser() {
    const url = `https://reqres.in/api/unknown`;
    return this.http.get(url);
  }
}