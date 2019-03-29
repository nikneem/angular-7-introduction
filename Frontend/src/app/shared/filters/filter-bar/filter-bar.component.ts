import { Component, OnInit } from '@angular/core';
import { ContactFilterDto, DateRangeDto } from 'src/app/models/contact.models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  SetNameFilter,
  SetAddressFilter,
  SetDateRangeFilter
} from 'src/app/state/contacts/contact.actions';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  filter: ContactFilterDto;

  constructor(private store: Store<AppState>) {
    const self = this;
    this.store
      .select(str => str.contactState.filter)
      .subscribe(val => (self.filter = val));
  }

  setNameFilter(value) {
    this.store.dispatch(new SetNameFilter(value));
  }
  setAddressFilter(value) {
    this.store.dispatch(new SetAddressFilter(value));
  }
  setDateRangeFilter(value: DateRangeDto) {
    this.store.dispatch(new SetDateRangeFilter(value.from, value.to));
  }

  ngOnInit() {}
}
