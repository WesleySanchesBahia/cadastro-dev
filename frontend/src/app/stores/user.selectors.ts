import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const  selectUserState = createFeatureSelector<UserState>("users");
export const  selectFilteredUsers  = createSelector(selectUserState, state => state.filterUsers)
