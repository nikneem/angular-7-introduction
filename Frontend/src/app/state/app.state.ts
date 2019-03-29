import { routerReducer } from '@ngrx/router-store';
import { ContactState, INITIAL_CONTACT_STATE } from './contacts/contact.state';
import { ContactReducer } from './contacts/contact.reducer';

export interface AppState {
  contactState: ContactState;
}

export const INITIAL_APPSTORE: AppState = {
  contactState: INITIAL_CONTACT_STATE
};

export const reducers = {
  contactState: ContactReducer,
  routerReducer: routerReducer
};
