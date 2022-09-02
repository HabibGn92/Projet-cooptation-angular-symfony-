import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) {}

  login(log:FormGroup) :Observable <any>{
    return this.http.post('http://127.0.0.1:8000/api/login_check',log)

       

  }
 
  public isAuthenticated() : boolean {
 
   let jwt = JSON.parse(localStorage.getItem('jwt') || '{}');
 
   return !this.jwtHelper.isTokenExpired(jwt.token);
 
 }

}
