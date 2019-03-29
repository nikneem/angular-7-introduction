import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateRangeDto } from 'src/app/models/contact.models';

@Component({
  selector: 'app-daterange-filter',
  templateUrl: './daterange-filter.component.html',
  styleUrls: ['./daterange-filter.component.scss']
})
export class DaterangeFilterComponent implements OnInit {
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() filterChanged: EventEmitter<DateRangeDto> = new EventEmitter();

  constructor() {}

  validateRange() {
    console.log(this.fromDate + ' <--> ' + this.toDate);
    if (this.fromDate && this.toDate) {
      if (this.fromDate > this.toDate) {
        alert('KAN NIET');
        return;
      }
    }

    const range = new DateRangeDto({ from: this.fromDate, to: this.toDate });
    this.filterChanged.emit(range);
  }

  ngOnInit() {}
}
