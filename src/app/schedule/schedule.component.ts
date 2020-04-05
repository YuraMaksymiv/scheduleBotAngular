import { Component, OnInit } from '@angular/core';
import {ScheduleService} from '../services/schedule.service';
import {APIResponse} from '../Interfaces/API_Response';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService
  ) {}

  schedule: any;
  updated: any;
  currentSchedule: any;
  changedSchedule: any;
  times = ["9.30-10.05", "10.20-11.55", "12.10-13.45", "14.30-16.05", "16.20-17.35"];
  groups = ["КН - 11/1", "КН - 41/1", "КН - 41/2"];
  currentGroup = "КН - 11/1";
  currentName: string;
  print = false;
  updatingError: any;

  onChanged(increased, lessonIndex, dayIndex, columnIndex){
    let time = this.times[lessonIndex];
    lessonIndex++;
    let isLessonExist = false;
    let lessonNumber = lessonIndex.toString();
    this.changedSchedule[dayIndex].lesson.forEach(i => {
      if(i.numberOfLesson === lessonNumber) {
        isLessonExist = true;
        i.nameOfLesson[columnIndex] = increased;
      }
    });

    if(!isLessonExist) {
      let newLesson = {
        numberOfLesson : lessonNumber,
        nameOfLesson: ["0", "0"],
        time: time
      };
      newLesson.nameOfLesson[columnIndex] = increased;
      this.changedSchedule[dayIndex].lesson.push(newLesson);
      this.changedSchedule[dayIndex].lesson.sort((a,b) => (a.numberOfLesson > b.numberOfLesson) ? 1 : ((b.numberOfLesson > a.numberOfLesson) ? -1 : 0));
    }
    this.print = true;
  }

  getScheduleByName(groupName): void {
    this.scheduleService.getSchedule(groupName)
      .subscribe((response: APIResponse) => {
        if (response) {
          this.schedule = response;
          this.schedule = this.schedule.schedule;
          this.currentName = this.schedule.groupName;
          this.currentSchedule = this.schedule.days;
          console.log(this.currentSchedule);
          this.changedSchedule = JSON.parse(JSON.stringify(this.currentSchedule));
        }
      });
  };

  getLessonNameByNumber(number, data, index): any{
    let names, name;
    names = data.filter(i => i.numberOfLesson == number);
    if(names && names.length) name = names[0].nameOfLesson[index];
    if(name === "" || name == 0 || !name) name = "empty";
    return name
  }

  saveClick(): any{
    let toUpdate = {
      groupName: this.currentName,
      days: this.changedSchedule
    };
    this.scheduleService.updateSchedule(toUpdate)
      .subscribe((response: APIResponse) => {
        if (response) {
          if(!response.success) {
            this.updatingError = response.message;
            this.getScheduleByName(this.currentName);
          } else {
            this.updated = response;
            this.getScheduleByName(this.updated.groupName);
          }
        }
      });
  }

  ngOnInit() {
    this.getScheduleByName(this.groups[0]);
  }

}
