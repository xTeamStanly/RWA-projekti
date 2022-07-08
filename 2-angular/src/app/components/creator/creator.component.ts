import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { defaultEntry, Entry } from 'src/app/models/entry.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { nanoid } from 'nanoid';
import { EntryService } from 'src/app/services/entry.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { addEntry, updateEntry } from 'src/app/store/entry.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

  @Input() entry: Entry | null = defaultEntry;

  // html elementi
  @ViewChild('titleInput', { static: true }) titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput', { static: true }) dateInput: ElementRef<HTMLInputElement>;
  @ViewChild('colorInput', { static: true }) colorInput: ElementRef<HTMLInputElement>;
  @ViewChild('contentInput', { static: true }) contentInput: ElementRef<HTMLInputElement>;
  @ViewChild('commentInput', { static: true }) commentInput: ElementRef<HTMLInputElement>;

  // date
  localDate: Date = new Date();

  constructor(
    titleInput: ElementRef<HTMLInputElement>,
    dateInput: ElementRef<HTMLInputElement>,
    colorInput: ElementRef<HTMLInputElement>,
    contentInput: ElementRef<HTMLInputElement>,
    commentInput: ElementRef<HTMLInputElement>,

    public dialog: MatDialog,
    private entryService: EntryService,
    private store: Store<AppState>,
    private _router?: Router
  ) {
    this.titleInput = titleInput;
    this.dateInput = dateInput;
    this.colorInput = colorInput;
    this.contentInput = contentInput;
    this.commentInput = commentInput;
  }

  // color
  private isColor(color: string) {
    return /^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i.test(color.trim().toLowerCase()) === true;
  }

  getColor() : string {
    if(!this.entry || !this.entry.color) { return '#5C5CFF'; }

    // check if color is hex
    if(this.isColor(this.entry.color) === true) {
      return this.entry.color;
    } else {
      return '#5C5CFF';
    }
  }

  // keyword + chips
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];

  getKeywords() : string[] {
    if(!this.entry || !this.entry.keywords || !this.entry.keywords.length) { return []; }
    return this.entry.keywords;
  }

  addKeyword(event: MatChipInputEvent) : void {
    const value: string = (event.value || '').trim();

    if(value) {
      this.entry?.keywords.push(value);
    }

    event.chipInput!.clear();
  }

  removeKeyword(keywordIndex: string) : void {
    const index: number | undefined = this.entry?.keywords?.indexOf(keywordIndex);
    if(typeof(index) !== 'number') { return; }

    if(index >= 0) { this.entry?.keywords?.splice(index, 1); }
  }

  // submit button
  submit() : void {

    let title: string = this.titleInput.nativeElement.value ?? '';
    let color: string = this.isColor(this.colorInput.nativeElement.value) === true ? this.colorInput.nativeElement.value : '#5C5CFF';
    let content: string = this.contentInput.nativeElement.value ?? '';
    let comment: string = this.commentInput.nativeElement.value ?? '';

    let id: string = (this.entryService.editMode === true) ? this.entry!.id : nanoid();

    if(!title || !content) {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Greška',
          message: 'Proverite ponovo unos naslova i sadržaja! Verovatno su polja ostala prazna.'
        }
      });
      return;
    }

    this.entry = {
      id,
      title,
      date: this.localDate.toLocaleDateString('sr-RS'),
      color,
      content,
      comment,
      keywords: this.getKeywords(),
    }

    if(this.entryService.editMode === true) {
      this.store.dispatch(updateEntry({ entry: this.entry }));
    } else {
      this.store.dispatch(addEntry({ entry: this.entry }));
    }

    this.dialog.open(DialogComponent, {
      data: {
        title: 'Uspeh',
        message: `Uspešno ${(this.entryService.editMode === true) ? 'ažurirano' : 'kreirano'} !`
      }
    });

    this.entryService.editMode = false;
    this._router?.navigate([ '/' ]);
  }

  ngOnInit(): void {

    if(this.entryService.editMode === true && this.entryService.transferEntry !== null) {
      this.entry = this.entryService.transferEntry;
    } else {
      this.entryService.editMode = false;
    }

  }

}
