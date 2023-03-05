import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ToastrModule.forRoot(), AppRoutingModule, ReactiveFormsModule,
  HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, LoginComponent, WelcomeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},]
})
export class AppModule { }
