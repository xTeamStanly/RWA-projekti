import { Component, Input, OnInit } from '@angular/core';
import { defaultEntry, Entry } from 'src/app/models/entry.model';

@Component({
  selector: 'entry-card',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor() { }

  @Input() entry: Entry | null = null;

  getContent() : string | undefined {
    if(!this.entry || !this.entry.content) { return ''; }

    if(this.entry.content.length > 256) {
      return this.entry.content.substring(0, 256) + '...';
    } else {
      return this.entry.content;
    }
  }

  ngOnInit(): void {
    this.entry = defaultEntry;
  }

}
