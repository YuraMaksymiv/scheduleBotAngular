import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {

  constructor() { }

  @Output() onChanged = new EventEmitter<any>();
  // change(increased:any) {
  //   this.onChanged.emit(increased);
  // }

  @Input() inputItem;
  @ViewChild('f', {static: false}) inputRef: ElementRef;

  isItemFocused: boolean = false;

  changeEvent(value: any): void{
    this.isItemFocused = false;
    this.inputItem = value;
    this.onChanged.emit(value);
  }

  changeFocus(): void{
    setTimeout(() => {this.inputRef.nativeElement.focus()}, 0);
    this.isItemFocused = !this.isItemFocused;
  }

  ngOnInit() {
  }

}