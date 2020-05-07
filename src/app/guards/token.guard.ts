import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from "rxjs";

export class TokenGuard implements CanActivate{
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

    let token = localStorage.getItem('token')
    if(token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false
    }

  }
}
