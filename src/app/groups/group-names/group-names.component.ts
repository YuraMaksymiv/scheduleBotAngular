import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Route, Router} from '@angular/router';
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
    private groupService: GroupsService,
    private router: Router,
  ) { }

  params: any;
  groupsFromSection: any;
  groupNames: any;
  groupsLength: any;
  data = [];
  size = 6;
  page = 0;

  getData(obj) {
    let index = 0;
    const startingIndex = obj.pageIndex * obj.pageSize;
    const endingIndex = startingIndex + obj.pageSize;
    this.data = this.groupNames.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

  getSchedule(groupName): void {
    this.router.navigate(['/schedule'], {queryParams: {group: groupName, section: this.params.section, mainGroup: this.params.groupName}});
  }

  getGroupsByName(groupName, section): void {
    this.groupService.getGroupsBySection(section)
      .subscribe((response: any) => {
        if (response) {
          this.groupsFromSection = response;
          this.groupsFromSection = this.groupsFromSection.groups;
          this.groupNames = this.groupsFromSection.filter(i => i.groupName === groupName)[0];
          this.groupNames = this.groupNames.groupList;
          this.groupsLength = this.groupNames.length;
          this.getData({pageIndex: this.page, pageSize: this.size});
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
