import { Action } from '@ngrx/store';
import { ContactFilterDto, ContactDto } from 'src/app/models/contact.models';

export const contactActions = {
  setInitialFilter: '[contactActions] setInitialFilter',

  setNameFilter: '[contactActions] setNameFilter',
  setAddressFilter: '[contactActions] setAddressFilter',
  setDateRangeFilter: '[contactActions] setDateRangeFilter',

  fetchContacts: '[contactActions] fetchContacts',
  fetchContactsSuccess: '[contactActions] fetchContactsSuccess',
  fetchContactsFailed: '[contactActions] fetchContactsFailed'
};

export class SetInitialFilter implements Action {
  readonly type = contactActions.setInitialFilter;
  constructor(public filter: ContactFilterDto) {}
}

export class SetNameFilter implements Action {
  readonly type = contactActions.setNameFilter;
  constructor(public value: string) {}
}
export class SetAddressFilter implements Action {
  readonly type = contactActions.setAddressFilter;
  constructor(public value: string) {}
}
export class SetDateRangeFilter implements Action {
  readonly type = contactActions.setDateRangeFilter;
  constructor(public from: Date, public to: Date) {}
}

export class FetchContacts implements Action {
  readonly type = contactActions.fetchContacts;
  constructor(public filter: ContactFilterDto) {}
}
export class FetchContactsSuccess implements Action {
  readonly type = contactActions.fetchContactsSuccess;
  constructor(public contacts: Array<ContactDto>) {}
}
export class FetchContactsFailed implements Action {
  readonly type = contactActions.fetchContactsFailed;
  constructor(public errorMessage: string) {}
}
