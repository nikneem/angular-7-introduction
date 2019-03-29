import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-name-filter',
  templateUrl: './name-filter.component.html',
  styleUrls: ['./name-filter.component.scss']
})
export class NameFilterComponent implements OnInit {
  @Input() filterValue: string;
  @Output() filterChanged: EventEmitter<string> = new EventEmitter();

  constructor() {}

  update(value: string) {
    this.filterChanged.emit(value);
  }
  clearFilter() {
    this.filterChanged.emit('');
    this.filterValue = '';
  }

  ngOnInit() {}
}
