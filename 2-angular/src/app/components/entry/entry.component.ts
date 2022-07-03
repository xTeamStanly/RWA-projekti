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

  ngOnInit(): void {
    this.entry = defaultEntry;
  }

}
