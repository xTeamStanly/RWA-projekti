import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  constructor(private httpClient: HttpClient) {}

  private readonly entryUrl: string = environment.api + '/entries';

  getAll() : Observable<Entry[]> {
    return this.httpClient.get<Entry[]>(this.entryUrl);
  }

  saveAll(entries: Entry[]) : boolean {
    // ! @important
    // u pitanju je mock baza, pa je ovo okej,
    // json-server ne podrzava slanje liste objekata

    try {
      entries.forEach((entry: Entry) => {

        // json-server ne prima duplikate :(
        this.httpClient.delete(this.entryUrl + `/${entry.id}`);
        this.httpClient.post(this.entryUrl, entry);

      });
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  }
}
