import { Component, OnInit } from '@angular/core';
import {GroupsService} from '../../services/groups.service';
import {APIResponse} from '../../Interfaces/API_Response';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-group-lists',
  templateUrl: './group-lists.component.html',
  styleUrls: ['./group-lists.component.scss']
})
export class GroupListsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupsService
  ) {}

  groupsFromSection: any;
  groupsLength: any;
  section: any;
  data = [];
  size = 8;
  page = 0;

  getData(obj) {
    let index = 0;
    const startingIndex = obj.pageIndex * obj.pageSize;
    const endingIndex = startingIndex + obj.pageSize;
    this.data = this.groupsFromSection.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

  getGroupsBySection(section): void {
    this.groupService.getGroupsBySection(section)
      .subscribe((response: any) => {
        if (response) {
          this.groupsFromSection = response;
          this.groupsFromSection = this.groupsFromSection.groups;
          this.groupsLength = this.groupsFromSection.length;
          this.getData({pageIndex: this.page, pageSize: this.size});
        }
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.section = params.section;
    });
    this.getGroupsBySection(this.section);
  }

}
