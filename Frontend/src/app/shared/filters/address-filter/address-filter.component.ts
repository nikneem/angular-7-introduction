import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-filter',
  templateUrl: './address-filter.component.html',
  styleUrls: ['./address-filter.component.scss']
})
export class AddressFilterComponent implements OnInit {
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
