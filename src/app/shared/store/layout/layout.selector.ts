import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./layout.state";

export const getLayoutState = createFeatureSelector<AppState>('layout');

export const getticketsArray = createSelector(
  getLayoutState,
  (state: AppState) => state
);
