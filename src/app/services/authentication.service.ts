import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  // modify the return type to properly use the full response
  login(username: string, password: string): Observable<any> {
    //
    const params = new HttpParams()
      .set('email', username)
      .set('password', password);
    const headers = { 'content-type': 'application/json' };
    return this.http.post('https://reqres.in/api/login', {
      params: params,
      headers: headers,
    });
  }
}
