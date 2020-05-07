import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['userId', 'username', 'name', 'section', 'groupsName', 'userType', 'createdAt'];
  dataSource = new MatTableDataSource();

  getUsers(): void {
    this.userService.getUsers({})
      .subscribe((response: any) => {
        if(response) {
          this.dataSource.data = response.users
        }
      })
  }

  ngOnInit() {
    this.getUsers();
    this.dataSource.sort = this.sort;
  }

}
