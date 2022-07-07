import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private httpClient: HttpClient) {}

  private readonly entryUrl: string = environment.api + '/entries';

  transferEntry: Entry | null = null;
  editMode: boolean = false;

  // read
  getEntries() : Observable<Entry[]> {
    return this.httpClient.get<Entry[]>(this.entryUrl);
  }

  // update
  updateEntry(entry: Entry) {
    return this.httpClient.patch(`${this.entryUrl}/${entry.id}`, entry);
  }

  // create
  addEntry(entry: Entry) {
    return this.httpClient.post<Entry>(this.entryUrl, entry);
  }

  // delete
  deleteEntry(entryID: string) {
    return this.httpClient.delete(`${this.entryUrl}/${entryID}`);
  }

}
