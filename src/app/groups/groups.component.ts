import { Component, OnInit } from '@angular/core';
import {GroupsService} from '../services/groups.service';
import {APIResponse} from '../Interfaces/API_Response';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(
    private groupService: GroupsService
  ) {}

  groups: any;

  getGroups(): void {
    this.groupService.getAllGroups()
      .subscribe((response: APIResponse) => {
        if (response) {
          this.groups = response;
          this.groups = this.groups.groups;
        }
      });
  }

  ngOnInit() {
    this.getGroups();
  }

}
