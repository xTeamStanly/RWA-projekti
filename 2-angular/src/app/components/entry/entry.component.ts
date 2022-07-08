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
  @Input() preview: boolean = true;
  @Output() entrySender: EventEmitter<Entry> = new EventEmitter<Entry>();
  backgroundColor: string = '';

  constructor(
    public dialog: MatDialog,
    private entryService: EntryService,
    private _router?: Router
  ) { }

  getContent() : string | undefined {
    if(!this.entry || !this.entry.content) { return ''; }

    if(this.entry.content.length > 256 && this.preview === true) {
      return this.entry.content.substring(0, 256) + '...';
    } else {
      return this.entry.content;
    }
  }

  showEntryDialog() : void {
    if(this.preview === true) { this.entrySender.emit(this.entry as Entry); }
  }

  ngOnInit() : void {
    if(this.preview === false) {
      let newColor: string = this.entry!.color.substring(0, 7); // hex
      newColor += '0F'; // transparent
      this.backgroundColor = newColor;
      console.log(this.backgroundColor)
    }
  }


  editEntry(event: Event) : void {
    this.dialog.closeAll();

    this._router?.navigate([ '/new' ]);

    this.entryService.transferEntry = this.entry;
    this.entryService.editMode = true;
  }

  deleteEntry(event: Event) : void {
    this.dialog.closeAll();

    this.dialog.open(DialogDeleteComponent, {
      data: {
        title: 'Potvrda o brisanju',
        message: `Da li sigurno želite da obrišete unos "${this.entry!.title}"?`,
        entryID: this.entry!.id
      }
    });
  }

}
