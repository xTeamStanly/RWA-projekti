import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Entry } from "../models/entry.model";

export interface EntriesState extends EntityState<Entry> { }

export const entriesAdapter: EntityAdapter<Entry> = createEntityAdapter<Entry>();

export const initialState: EntriesState = entriesAdapter.getInitialState();