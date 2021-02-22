import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
      private _http:HttpClient,
      private router:Router
  ) { }

  login(data)
  {
      return this._http.post(environment.url+'auth/login',data)
  }
  logout()
  {
      localStorage.getItem('token')
      localStorage.removeItem('token');
      this.router.navigate((['/login']));
      console.log(localStorage.getItem('token'));
  }
  loggedIn()
  {
      return !!localStorage.getItem('token');
  }
}
