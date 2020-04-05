import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupsService} from '../../services/groups.service';
import {APIResponse} from '../../Interfaces/API_Response';

@Component({
  selector: 'app-users-for-group',
  templateUrl: './users-for-group.component.html',
  styleUrls: ['./users-for-group.component.scss']
})
export class UsersForGroupComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupsService
  ) { }

  params: any;
  users: any;

  getUsersForGroup(group): void {
    this.groupService.getUsersForGroup(group)
      .subscribe((response: APIResponse) => {
        if (response) {
          this.users = response;
        }
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
    });
    this.getUsersForGroup(this.params.courseName);
  }

}
