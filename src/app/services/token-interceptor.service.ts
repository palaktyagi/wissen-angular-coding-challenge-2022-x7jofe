import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.method);
    if(req.url.includes('/api/login') && req.method === 'POST') {
      return next.handle(req);
    }

    if(this.authService.isAuthenticated()) {
      const token = this.authService.getAuthToken();
      req = req.clone({
        headers: req.headers.append('Authorization', token).append('Content-Type','application/json')
      });

      return next.handle(req);
    }
  }
}