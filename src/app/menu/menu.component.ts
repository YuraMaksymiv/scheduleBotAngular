import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  scheduleClick() : void {
    this.router.navigate(['/sections']);
  }

  importClick() : void {
    this.router.navigate(['/import']);
  }

  notificationsClick() : void {
    this.router.navigate(['/notifications']);
  }

  usersClick() : void {
    this.router.navigate(['/users']);
  }

  aboutClick() : void {
    this.router.navigate(['/about']);
  }

  sandboxClick() : void {
    this.router.navigate(['/sandbox']);
  }

  ngOnInit() {
  }

}
