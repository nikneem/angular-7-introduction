import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ContactinfoService } from 'src/app/services/contactinfo.service';
import { ContactDto, ContactFilterDto } from 'src/app/models/contact.models';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  SetInitialFilter,
  FetchContacts
} from 'src/app/state/contacts/contact.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public filter: ContactFilterDto;
  public contactData: Array<ContactDto>;
  displayedColumns: string[] = [
    'businessEntityID',
    'firstName',
    'lastName',
    'street',
    'postalCode',
    'modifiedDate'
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {
    const self = this;
    self.store
      .select(str => str.contactState.listItems)
      .subscribe(items => (self.contactData = items));
    self.store
      .select(str => str.contactState.filter)
      .subscribe(filter => {
        if (filter) {
          const isEqual = _.isEqual(filter, this.filter);
          if (!isEqual) {
            self.store.dispatch(new FetchContacts(filter));
            self.updateParams(filter);
          }
          this.filter = filter;
        }
      });
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.queryParams;
    this.readParameters(params);
  }

  readParameters(params) {
    const filters = Object.assign(new ContactFilterDto(), params);
    if (filters.dateFrom) {
      filters.dateFrom = new Date(Date.parse(params.dateFrom));
      if (!this.isValidDate(filters.dateFrom)) {
        filters.dateFrom = undefined;
      }
    }
    if (filters.dateTo) {
      filters.dateTo = new Date(Date.parse(params.dateTo));
      if (!this.isValidDate(filters.dateTo)) {
        filters.dateTo = undefined;
      }
    }
    if (filters.page <= 1) {
      filters.page = 1;
    }
    if (filters.pageSize <= 1) {
      filters.pageSize = 5;
    }
    this.store.dispatch(new SetInitialFilter(filters));
  }

  updateParams(filter: ContactFilterDto) {
    const p: Params = {
      name: filter.name && filter.name.length > 0 ? filter.name : undefined,
      address:
        filter.address && filter.address.length > 0
          ? filter.address
          : undefined,
      dateFrom: filter.dateFrom ? filter.dateFrom.toISOString() : undefined,
      dateTo: filter.dateTo ? filter.dateTo.toISOString() : undefined,
      sort: filter.sort && filter.sort.length > 0 ? filter.sort : undefined,
      page: filter.page,
      pageSize: filter.pageSize
    };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: p,
      queryParamsHandling: 'merge' // remove to replace all query params by provided
    });
  }

  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}
