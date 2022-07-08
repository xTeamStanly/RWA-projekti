import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-dialog-entry',
  templateUrl: './dialog-entry.component.html',
  styleUrls: ['./dialog-entry.component.scss']
})
export class DialogEntryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Entry) { }

  ngOnInit(): void { }

}