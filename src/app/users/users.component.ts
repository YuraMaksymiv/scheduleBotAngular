import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['userId', 'username', 'name', 'section', 'groupsName', 'userType', 'createdAt', 'button'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
    this.dataSource.paginator = this.paginator;
  }

}
