import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationsService} from '../services/notifications.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private notificationsService: NotificationsService
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

  changeUserType(userId): void {
    let isRight = confirm('Ви впевнені, що хочете призначити користувача старостою?');
    if(isRight) {
      this.userService.changeType(userId, "monitor")
        .subscribe((response: any) => {
          if(response) {
            this.getUsers();
          }
        })
    }
  }
  
  sendNotification(userId): void {
    let text = prompt('Введіть повідомлення');
    if(text) {
      this.notificationsService.sendToUser(userId, text)
        .subscribe((response: any) => {
          if(response) {
            console.log("Done");
          }
        })
    }
  }

  ngOnInit() {
    this.getUsers();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
