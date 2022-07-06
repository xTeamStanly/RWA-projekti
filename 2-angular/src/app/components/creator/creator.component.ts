import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { defaultEntry, emptyEntry, Entry } from 'src/app/models/entry.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {


  @Input() entry: Entry | null = defaultEntry;

  // date
  getDate() : Date {
    if(!this.entry || !this.entry.date) { return new Date(); }
    return this.entry.date;
  }

  // color
  getColor() : string {
    if(!this.entry || !this.entry.color) { return '#5C5CFF'; }

    // check if color is hex
    if(/^#(?:(?:[\da-f]{3}){1,2}|(?:[\da-f]{4}){1,2})$/i.test(this.entry.color.trim().toLowerCase()) === true) {
      return this.entry.color;
    } else {
      return '#5C5CFF';
    }
  }

  // keyword + chips
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];
  // localKeywords: string[] = [];

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



  // html elementi
  @ViewChild('titleInput', { static: true }) titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput', { static: true }) dateInput: ElementRef<HTMLInputElement>;
  @ViewChild('colorInput', { static: true }) colorInput: ElementRef<HTMLInputElement>;
  @ViewChild('contentInput', { static: true }) contentInput: ElementRef<HTMLInputElement>;
  @ViewChild('commentInput', { static: true }) commentInput: ElementRef<HTMLInputElement>;

  // submit button
  submit() : void {
    console.log(this.entry);
    console.table([
      this.titleInput.nativeElement.value,
      this.dateInput.nativeElement.value,
      this.colorInput.nativeElement.value,
      this.contentInput.nativeElement.value,
      this.commentInput.nativeElement.value,
      this.entry?.keywords
    ])

  }


  constructor(
    titleInput: ElementRef<HTMLInputElement>,
    dateInput: ElementRef<HTMLInputElement>,
    colorInput: ElementRef<HTMLInputElement>,
    contentInput: ElementRef<HTMLInputElement>,
    commentInput: ElementRef<HTMLInputElement>
  ) {
    this.titleInput = titleInput;
    this.dateInput = dateInput;
    this.colorInput = colorInput;
    this.contentInput = contentInput;
    this.commentInput = commentInput;
  }

  ngOnInit(): void {
  }

}
