import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
 
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('jwt') as string;
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.roles[0] !== expectedRole 
    ) {
      this.router.navigate(['']);
      return false;
    }
    return true;
}
getRole(){
  const token = localStorage.getItem('jwt') as string;
  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  return tokenPayload.roles[0];

}}

