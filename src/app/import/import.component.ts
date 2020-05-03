import { Component, OnInit } from '@angular/core';
import {ImportService} from '../services/import.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  importForm: FormGroup

  constructor(
    private importService: ImportService
  ) {
    this.importForm = new FormGroup({
      "section": new FormControl("", Validators.required)
    });
  }

  selectedFile: File
  type: string
  isClicked = false
  isDone = false

  groupsClick(): void {
    this.isClicked = true;
    this.type = "groups";
    this.isDone = false;
  }

  scheduleClick(): void {
    this.isClicked = true;
    this.type = "schedule";
    this.isDone = false;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload(type, importForm) {
    if(type === "groups") {
      this.importService.importGroups(this.selectedFile, importForm.section)
        .subscribe((response: any) => {
          if(response) {
            this.isDone = true
          }
        })
    } else if (type === "schedule") {
      this.importService.importSchedule(this.selectedFile)
        .subscribe((response: any) => {
          if(response) {
            this.isDone = true
          }
        })
    }
  }

  ngOnInit() {
  }

}
