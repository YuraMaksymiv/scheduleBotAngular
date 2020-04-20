import {Component, OnInit} from '@angular/core';
import {APIResponse} from './Interfaces/API_Response';
import {GroupsService} from './services/groups.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private _location: Location
  ) {}

  isLogged: boolean;
  inMenu = false;

  checkLogin() {
    if(localStorage.getItem("token")) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
      this.router.navigate(['/login']);
    }
  }

  backClick(): void {
    this._location.back();
  }

  logoutClick(): void {
    localStorage.removeItem('token');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.checkLogin()
  }

}
