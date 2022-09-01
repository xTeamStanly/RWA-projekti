import { Component, OnInit } from '@angular/core';
import { emptyEntry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/services/entry.service';


@Component({
  selector: 'app-dialog-clear',
  templateUrl: './dialog-clear.component.html',
  styleUrls: ['./dialog-clear.component.scss']
})
export class DialogClearComponent implements OnInit {

  constructor(
    private entryService: EntryService,
  ) { }

  ngOnInit(): void { }

  acceptDialogClear() : void {

    this.entryService.editMode = false;
    this.entryService.transferEntry = {
      ...emptyEntry,
      date: new Date().toLocaleDateString('sr-RS')
    };

    window.location.reload();
  }

}
