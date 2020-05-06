import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  displayedColumns: string[] = ['userId', 'username', 'name', 'section', 'groupsName', 'userType', 'createdAt'];
  dataSource: string[];

  getUsers(): void {
    this.userService.getUsers({})
      .subscribe((response: any) => {
        if(response) {
          this.dataSource = response.users
        }
      })
  }

  searchUser(searchValue): void {
    this.userService.getUsers({search: searchValue})
      .subscribe((response: any) => {
        if(response) {
          this.dataSource = response.users
        }
      })
  }

  ngOnInit() {
    this.getUsers()
  }

}
