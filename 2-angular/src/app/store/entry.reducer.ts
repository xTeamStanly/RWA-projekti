import { createReducer, on } from '@ngrx/store';
import * as Actions from './entry.actions';
import { entriesAdapter, EntriesState, initialState } from './entry.state';

export const entryReducer = createReducer(
    initialState,

    // create
    on(Actions.addEntrySuccess, (currentState: EntriesState, action) => {
        return entriesAdapter.addOne(action.entry, currentState);
    }),

    // delete
    on(Actions.deleteEntrySuccess, (currentState: EntriesState, action) => {
        return entriesAdapter.removeOne(action.entryID, currentState);
    }),

    // read
    on(Actions.loadEntriesSuccess, (currentState: EntriesState, action) => {
        return entriesAdapter.setAll(action.entries, currentState);
    }),

    // update
    on(Actions.updateEntrySuccess, (currentState: EntriesState, action) => {
        return entriesAdapter.updateOne(action.entry, currentState);
    })

)