import { createFeatureSelector, createSelector } from "@ngrx/store";
import { entriesAdapter, EntriesState } from "./entry.state";


const getEntriesState = createFeatureSelector<EntriesState>('entries');
export const entriesSelector = entriesAdapter.getSelectors();

export const getEntries = createSelector(getEntriesState, entriesSelector.selectAll);
export const getEntriesEntities = createSelector(getEntriesState, entriesSelector.selectEntities);