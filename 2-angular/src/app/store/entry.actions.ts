import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store'
import { Entry } from '../models/entry.model';

// create
export const addEntry = createAction(
    '[Create Page] Add Entry',
    props<{ entry: Entry }>()
);
export const addEntrySuccess = createAction(
    '[Create Page] Add Entry Success',
    props<{ entry: Entry }>()
);

// update
export const updateEntry = createAction(
    '[Create Page] Update Entry',
    props<{ entry: Entry }>()
);
export const updateEntrySuccess = createAction(
    '[Create Page] Update Entry Success',
    props<{ entry: Update<Entry> }>()
)

// delete
export const deleteEntry = createAction(
    '[Home Page] Delete Entry',
    props<{ entryID: string }>()
);
export const deleteEntrySuccess = createAction(
    '[Home Page] Delete Entry Success',
    props<{ entryID: string }>()
);

// read
export const loadEntries = createAction('[Home Page] Load Entries');
export const loadEntriesSuccess = createAction(
    '[Home Page] Load Entries Success',
    props<{ entries: Entry[] }>()
);