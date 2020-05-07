import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';


@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
              private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('%c UNAUTHORIZED /!\\ ', 'border: 1px red solid; color: red;');
              this.auth.logoutUser();
              this.router.navigate(['/login'])
            }
          }
        }
      )
    );
  }
}
