import * as _ from 'lodash';
import { ContactState } from './contact.state';
import {
  contactActions,
  SetInitialFilter,
  FetchContactsFailed,
  FetchContactsSuccess,
  SetNameFilter,
  SetAddressFilter,
  SetDateRangeFilter
} from './contact.actions';
import { ContactFilterDto } from 'src/app/models/contact.models';

export function ContactReducer(state: ContactState, action: any) {
  {
    switch (action.type) {
      case contactActions.setInitialFilter:
        return setInitialFilterHandler(state, action);

      case contactActions.setNameFilter:
        return setNameFilterHandler(state, action);
      case contactActions.setAddressFilter:
        return setAddressFilterHandler(state, action);
      case contactActions.setDateRangeFilter:
        return setDateRangeFilterHandler(state, action);

      case contactActions.fetchContactsSuccess:
        return fetchContactsSuccessHandler(state, action);
      case contactActions.fetchContactsFailed:
        return fetchContactsFailedHandler(state, action);

      default:
        return state;
    }
  }
}

function setInitialFilterHandler(
  state: ContactState,
  action: SetInitialFilter
): ContactState {
  const copyState: ContactState = Object.assign({}, state);
  copyState.errorMessage = null;
  copyState.isLoading = true;
  copyState.filter = action.filter;
  return copyState;
}

function setNameFilterHandler(
  state: ContactState,
  action: SetNameFilter
): ContactState {
  const copyState: ContactState = Object.assign({}, state);
  const newFilter = _.cloneDeep(copyState.filter) as ContactFilterDto;
  newFilter.name = action.value;
  copyState.filter = newFilter;
  return copyState;
}
function setAddressFilterHandler(
  state: ContactState,
  action: SetAddressFilter
): ContactState {
  const copyState: ContactState = Object.assign({}, state);
  const newFilter = _.cloneDeep(copyState.filter) as ContactFilterDto;
  newFilter.address = action.value;
  copyState.filter = newFilter;
  return copyState;
}
function setDateRangeFilterHandler(
  state: ContactState,
  action: SetDateRangeFilter
): ContactState {
  const copyState: ContactState = Object.assign({}, state);
  const newFilter = _.cloneDeep(copyState.filter) as ContactFilterDto;
  newFilter.dateFrom = action.from;
  newFilter.dateTo = action.to;
  copyState.filter = newFilter;
  return copyState;
}

function fetchContactsSuccessHandler(
  state: ContactState,
  action: FetchContactsSuccess
): ContactState {
  const copyState: ContactState = Object.assign({}, state);
  copyState.errorMessage = null;
  copyState.isLoading = false;
  copyState.listItems = action.contacts;
  return copyState;
}

function fetchContactsFailedHandler(
  state: ContactState,
  action: FetchContactsFailed
): ContactState {
  const copyState: ContactState = Object.assign({}, state);
  copyState.errorMessage = action.errorMessage;
  copyState.isLoading = false;
  return copyState;
}
