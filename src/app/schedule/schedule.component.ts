import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../services/schedule.service';
import {GroupsService} from '../services/groups.service';
import {APIResponse} from '../Interfaces/API_Response';
import {filter} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService,
    private groupsService: GroupsService,
    private route: ActivatedRoute,
  ) {}

  schedule: any;
  updated: any;
  currentSchedule: any;
  times = ["9.30-10.05", "10.20-11.55", "12.10-13.45", "14.30-16.05", "16.20-17.35"];
  currentGroup: any;
  groups: [];
  currentName: string;
  print = false;
  updatingError: any;
  params: any;
  isEdit = false;


  onChanged(increased, lessonIndex, dayIndex, columnIndex){
    this.isEdit = !this.isEdit;
    lessonIndex++;
    let isLessonExist = false;
    let lessonNumber = lessonIndex.toString();
    this.currentSchedule[dayIndex].lesson.forEach(i => {
      if(i.numberOfLesson === lessonNumber) {
        isLessonExist = true;
        i.nameOfLesson[columnIndex] = increased;
      }
    });
    this.print = true;
  }

  getScheduleByName(groupName): void {
    this.scheduleService.getSchedule(groupName)
      .subscribe((response: APIResponse) => {
        if (response.code === 200) {
          this.schedule = response.data;
          this.currentName = this.schedule.groupName;
          this.currentSchedule = this.schedule.days;
        }
      });
  };

  getOtherGroupNames(section, mainGroup): void {
    let groups;
    this.groupsService.getGroupsBySection(section)
      .subscribe((response: APIResponse) => {
        if (response.code === 200) {
          groups = response.data;
          groups = groups.groups.filter(i => i.groupName === mainGroup)[0];
          this.groups = groups.groupList;
        }
      });
  };

  saveClick(): void {
    let toUpdate = {
      groupName: this.currentName,
      days: this.currentSchedule
    };
    this.scheduleService.updateSchedule(toUpdate)
      .subscribe((response: APIResponse) => {
        if (response) {
          if(response.code !== 200) {
            this.updatingError = response.data;
            this.getScheduleByName(this.currentName);
          } else {
            this.updated = response.data;
            this.getScheduleByName(this.updated.groupName);
            this.isEdit = !this.isEdit;
          }
        }
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params = params;
    });
    this.currentGroup = this.params.group;
    this.getOtherGroupNames(this.params.section, this.params.mainGroup);
    this.getScheduleByName(this.params.group);
  }

}
