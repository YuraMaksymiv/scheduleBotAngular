import {Component, OnInit} from '@angular/core';
import {APIResponse} from './Interfaces/API_Response';
import {GroupsService} from './services/groups.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  isLogged: boolean;

  checkLogin() {
    if(localStorage.getItem("token")) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.checkLogin()
  }

}
