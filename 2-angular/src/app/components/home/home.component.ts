import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Entry } from 'src/app/models/entry.model';
import { loadEntries } from 'src/app/store/entry.actions';
import { getEntries } from 'src/app/store/entry.selector';
import { DialogEntryComponent } from '../dialog-entry/dialog-entry.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  entries: Observable<Entry[]> = of([]);
  breakpointColumns: number = 3;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
  ) { }

  showEntryDialog(entry: Entry) : void {
    this.dialog.open(DialogEntryComponent, {
      data: entry
    });
  }

  private getBreakpointColumsCount(innerWidth: number) : number {
    if(innerWidth >= 2270) { return 3; }
    if(innerWidth >= 1615) { return 2; }
    return 1;
  }

  resize(event: Event) : void {
    let window: Window = event.target as Window;
    this.breakpointColumns = this.getBreakpointColumsCount(window.innerWidth);
  }

  ngOnInit(): void {
    this.breakpointColumns = this.getBreakpointColumsCount(window.innerWidth);
    this.store.dispatch(loadEntries());
    this.entries = this.store.select(getEntries);
  }

}
