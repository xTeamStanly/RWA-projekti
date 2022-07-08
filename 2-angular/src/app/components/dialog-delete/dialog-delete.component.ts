import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { EntryService } from 'src/app/services/entry.service';
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
    private store: Store<AppState>,
    private entryService: EntryService
  ) { }

  ngOnInit(): void { }

  acceptDialogDelete() : void {

    if(this.entryService.transferEntry && this.entryService.transferEntry.id === this.data.entryID) {
      this.entryService.transferEntry = null;
      this.entryService.editMode = false;
    }

    this.store.dispatch(deleteEntry({ entryID: this.data.entryID }));
  }

}
