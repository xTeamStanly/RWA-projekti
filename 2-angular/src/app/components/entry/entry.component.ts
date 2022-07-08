import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Entry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/services/entry.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'entry-card',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  @Input() entry: Entry | null = null;
  @Output() entrySender: EventEmitter<Entry> = new EventEmitter<Entry>(); // todo fixx

  constructor(
    public dialog: MatDialog,
    private entryService: EntryService,
    private _router?: Router
  ) { }


  getContent() : string | undefined {
    if(!this.entry || !this.entry.content) { return ''; }

    if(this.entry.content.length > 256) {
      return this.entry.content.substring(0, 256) + '...';
    } else {
      return this.entry.content;
    }
  }

  showEntry() : void {
    this.entrySender.emit(this.entry as Entry);
  }

  ngOnInit() { }


  editEntry(event: Event) : void {
    this._router?.navigate([ '/new' ]);

    this.entryService.transferEntry = this.entry;
    this.entryService.editMode = true;
  }

  deleteEntry(event: Event) : void {
    this.dialog.open(DialogDeleteComponent, {
      data: {
        title: 'Potvrda o brisanju',
        message: `Da li sigurno želite da obrišete unos "${this.entry!.title}"?`,
        entryID: this.entry!.id
      }
    });
  }

}
