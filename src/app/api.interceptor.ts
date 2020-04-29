import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {GroupsService} from './services/groups.service';
import {Router} from '@angular/router';


@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  constructor(private Groups: GroupsService,
              private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('%c UNAUTHORIZED /!\\ ', 'border: 1px red solid; color: red;');
              localStorage.removeItem('token');
              this.router.navigate(['/login'])
            }
          }
        }
      )
    );
  }
}
