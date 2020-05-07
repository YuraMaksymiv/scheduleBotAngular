import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from "rxjs";

export class LoginGuard implements CanActivate{
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

    let token = localStorage.getItem('token')
    if(token) {
      this.router.navigate(['']);
      return true;
    } else return true;

  }
}
