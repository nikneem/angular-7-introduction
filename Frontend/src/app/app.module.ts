import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, INITIAL_APPSTORE } from './state/app.state';
import { ContactEffects } from './state/contacts/contact.effects';

let metaReducers = [];
if (environment.production === false) {
  metaReducers = [storeFreeze];
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers,
      initialState: INITIAL_APPSTORE
    }),
    StoreDevtoolsModule.instrument({ maxAge: 5 }),
    EffectsModule.forRoot([ContactEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
