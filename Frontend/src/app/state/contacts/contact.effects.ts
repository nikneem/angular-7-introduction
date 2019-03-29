import { Injectable } from '@angular/core';
import { ContactinfoService } from 'src/app/services/contactinfo.service';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  contactActions,
  FetchContactsSuccess,
  FetchContactsFailed,
  FetchContacts
} from './contact.actions';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, debounceTime } from 'rxjs/operators';

@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions, private service: ContactinfoService) {}

  @Effect()
  fetchContacts$: Observable<Action> = this.actions$.pipe(
    ofType<FetchContacts>(contactActions.fetchContacts),
    debounceTime(300),
    switchMap(action =>
      this.service.get(action.filter).pipe(
        map(profile => {
          return new FetchContactsSuccess(profile);
        }),
        catchError(error => of(new FetchContactsFailed(error)))
      )
    )
  );
}
