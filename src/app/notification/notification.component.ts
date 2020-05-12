import { Component, OnInit } from '@angular/core';
import {ImportService} from '../services/import.service';
import {NotificationsService} from '../services/notifications.service';
import {group} from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(
    private notificationsService: NotificationsService
  ) { }

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

  changeOption(): void {
    this.isError = false;
    this.isDone = false;
    this.notificationText = '';
    this.currentSection = '';
  }

  sendToAllClick(): void {
    this.changeOption();
    this.isSectionActive = false;
    this.isInputActive = !this.isInputActive;
    this.sendTo = 0;
  }

  sendToSectionClick(): void {
    this.changeOption();
    this.isInputActive = false;
    this.isSectionActive = !this.isSectionActive;
    this.sendTo = 1;
  }

  sendToGroupsClick(): void {
    this.changeOption();
    this.isInputActive = false;
    this.isSectionActive = !this.isSectionActive;
    this.sendTo = 2;
  }

  sendToMonitorsClick(): void {
    this.changeOption();
    this.isInputActive = false;
    this.isSectionActive = !this.isSectionActive;
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

  ngOnInit() {
  }

}
