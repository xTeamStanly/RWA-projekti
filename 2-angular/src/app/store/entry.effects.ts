import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Update } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { AppState } from "../app.state";
import { Entry } from "../models/entry.model";
import { EntryService } from "../services/entry.service";
import * as EntryActions from './entry.actions';
import { getEntries } from "./entry.selector";
@Injectable()
export class EntryEffects {
    constructor(
        private action$: Actions,
        private entryService: EntryService,
        private store: Store<AppState>
    ) {}

    // todo mergeMap -> switchMap ???

    // read
    loadEntrie$ = createEffect(() =>
        this.action$.pipe(
            ofType(EntryActions.loadEntries),
            withLatestFrom(this.store.select(getEntries)),
            mergeMap(() =>
                this.entryService.getEntries().pipe(
                    map((entries: Entry[]) => EntryActions.loadEntriesSuccess({ entries: entries })),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    );

    // create
    addEntrie$ = createEffect(() =>
        this.action$.pipe(
            ofType(EntryActions.addEntry),
            mergeMap((action) =>
                this.entryService.addEntry(action.entry).pipe(
                    map((entry: Entry) => EntryActions.addEntrySuccess({ entry: entry })),
                    catchError(() => of({ type: 'create error' }))
                )
            )
        )
    );

    // update
    updateEntrie$ = createEffect(() =>
        this.action$.pipe(
            ofType(EntryActions.updateEntry),
            mergeMap((action) =>
                this.entryService.updateEntry(action.entry).pipe(
                    map((entry) => {

                        const updatedEntry: Update<Entry> = {
                            id: action.entry.id,
                            changes: {
                                ...action.entry
                            }
                        };

                        return EntryActions.updateEntrySuccess({ entry: updatedEntry });
                    }),
                    catchError(() => of({ type: 'update error' }))
                )
            )
        )
    );

    // delete
    deleteEntrie$ = createEffect(() =>
        this.action$.pipe(
            ofType(EntryActions.deleteEntry),
            mergeMap((action) =>
                this.entryService.deleteEntry(action.entryID).pipe(
                    map((entry) => EntryActions.deleteEntrySuccess({ entryID: action.entryID })),
                    catchError(() => of({ type: 'delete error' }))
                )
            )
        )
    );

}