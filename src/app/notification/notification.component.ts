import { Component, OnInit } from '@angular/core';
import {NotificationsService} from '../services/notifications.service';
import {group} from '@angular/animations';
import {GroupsService} from '../services/groups.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(
    private notificationsService: NotificationsService,
    private groupService: GroupsService
  ) { }

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  isInputActive: boolean = false;
  isSectionActive: boolean = false;
  sendTo: number;
  currentGroup: string;
  currentSection: string;
  sections = ["ІДКТД", "ІЕЕМ", "ІМАКІТ", "ІЛСПГ"];
  notificationText: string;
  isError: boolean = false;
  errorMessage: string;
  isDone: boolean = false;
  groups: any;

  changeOption(): void {
    this.isError = false;
    this.isDone = false;
    this.notificationText = '';
    this.currentSection = '';
  }

  sendToAllClick(): void {
    this.changeOption();
    this.isSectionActive = false;
    this.isInputActive = true;
    this.sendTo = 0;
  }

  sendToSectionClick(): void {
    this.changeOption();
    this.isInputActive = false;
    this.isSectionActive = true;
    this.sendTo = 1;
  }

  sendToGroupsClick(): void {
    this.changeOption();
    this.isInputActive = false;
    this.isSectionActive = true;
    this.sendTo = 2;
  }

  sendToMonitorsClick(): void {
    this.changeOption();
    this.isInputActive = false;
    this.isSectionActive = true;
    this.sendTo = 3;
  }

  sendNotification(): void {
    this.isError = false;
    this.isDone = false;
    switch (this.sendTo) {
      case 0:
        this.notificationsService.sendToAll(this.notificationText)
          .subscribe((response: any) => {
            if(response) {
              this.isDone = true
            }
          }, error => {
            this.isError = true;
            this.errorMessage = error.error;
          })
        break;
      case 1:
        this.notificationsService.sendToSection(this.currentSection, this.notificationText)
          .subscribe((response: any) => {
            if(response) {
              this.isDone = true
            }
          }, error => {
            this.isError = true;
            this.errorMessage = error.error;
          })
        break;
      case 2:
        this.notificationsService.sendToGroup(this.currentGroup, this.notificationText)
          .subscribe((response: any) => {
            if(response) {
              this.isDone = true
            }
          }, error => {
            this.isError = true;
            this.errorMessage = error.error;
          })
        break;
      case 3:
        this.notificationsService.sendToMonitors(this.currentSection, this.notificationText)
          .subscribe((response: any) => {
            if(response) {
              this.isDone = true
            }
          }, error => {
            this.isError = true;
            this.errorMessage = error.error;
          })
        break;
    }
  }

  getGroups(): void {
    if(this.currentSection && this.sendTo === 2) {
    this.groupService.getMainGroupsBySection(this.currentSection)
      .subscribe((response: any) => {
        if (response) {
          this.groups = response;
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        }
      });
    }
  }

  setGroup(group): void {
    this.currentGroup = group.source.value;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groups.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
  }

}
