import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './components/entry/entry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { AboutComponent } from './components/about/about.component';
import { CreatorComponent } from './components/creator/creator.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { entryReducer } from './store/entry.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EntryEffects } from './store/entry.effects';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { DialogEntryComponent } from './components/dialog-entry/dialog-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    AboutComponent,
    CreatorComponent,
    HomeComponent,
    DialogComponent,
    DialogDeleteComponent,
    DialogEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // material design modules
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatGridListModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDialogModule,

    MatDatepickerModule,
    MatNativeDateModule,

    HttpClientModule,

    StoreModule.forRoot<AppState>({ entries: entryReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true
    }),
    EffectsModule.forRoot([EntryEffects]),

    FormsModule


  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
