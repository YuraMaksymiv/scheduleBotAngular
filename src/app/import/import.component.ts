import { Component, OnInit } from '@angular/core';
import {ImportService} from '../services/import.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {


  constructor(
    private importService: ImportService) {
  }

  selectedFile: File;
  isClicked = false;
  isDone = false;
  isError = false;
  isImported = true;
  isFileSelect = false;
  sections = ["ІДКТД", "ІЕЕМ", "ІМАКІТ", "ІЛСПГ"];
  currentSection: string;

  sectionClick(): void {
    this.isClicked = true;
    this.isDone = false;
    this.isError = false;
    this.isFileSelect = false;
  }

  onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile && this.selectedFile.name) this.isFileSelect = true;
    this.isError = false;
  }

  onUpload(): void {
    this.isImported = false;
    this.isError = false;
      this.importService.importSchedule(this.selectedFile, this.currentSection)
        .subscribe((response: any) => {
          if(response) {
            this.isDone = true
            this.isFileSelect = false;
            this.isImported = true;
          }
        }, error => {
          this.isImported = true;
          this.isError = true;
        })
  }

  ngOnInit() {
  }

}
