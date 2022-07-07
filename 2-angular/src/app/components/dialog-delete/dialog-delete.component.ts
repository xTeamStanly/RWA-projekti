import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Entry } from 'src/app/models/entry.model';
import { deleteEntry } from 'src/app/store/entry.actions';
import { DialogData } from '../dialog/dialog.component';

export interface DialogDeleteData extends DialogData {
  entryID: string;
}

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDeleteData,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
  }

  acceptDialogDelete() {
    this.store.dispatch(deleteEntry({ entryID: this.data.entryID }));
  }

}
