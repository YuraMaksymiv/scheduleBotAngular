import {Component, OnInit} from '@angular/core';
import {APIResponse} from './Interfaces/API_Response';
import {GroupsService} from './services/groups.service';
import {NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private _location: Location,

  ) {
    this.navigationEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  navigationEnd: Observable<NavigationEnd>;

  isLogged: boolean;
  inMenu = false;

  // checkLogin() {
  //   if(localStorage.getItem("token")) {
  //     this.isLogged = true;
  //   } else {
  //     this.isLogged = false;
  //   }
  // }

  backClick(): void {
    this._location.back();
  }

  logoutClick(): void {
    localStorage.removeItem('token');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.navigationEnd.subscribe(evt => {
      if (!this.router.url.includes('login')){
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    })
  }

}
