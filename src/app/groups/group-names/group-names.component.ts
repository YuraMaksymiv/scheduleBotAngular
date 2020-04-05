import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupsService} from '../../services/groups.service';
import {APIResponse} from '../../Interfaces/API_Response';

@Component({
  selector: 'app-group-names',
  templateUrl: './group-names.component.html',
  styleUrls: ['./group-names.component.scss']
})
export class GroupNamesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupsService
  ) { }

  params: any;
  groupsFromSection: any;
  groupNames: any;

  getGroupsByName(groupName, section): void {
    this.groupService.getGroupsBySection(section)
      .subscribe((response: APIResponse) => {
        if (response) {
          this.groupsFromSection = response;
          this.groupsFromSection = this.groupsFromSection.groups;
          this.groupNames = this.groupsFromSection.filter(i => i.groupName === groupName)[0];
          this.groupNames = this.groupNames.groupList;
        }
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
    });
    this.getGroupsByName(this.params.groupName, this.params.section);
  }

}
