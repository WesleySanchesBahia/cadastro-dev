import {createAction, props} from "@ngrx/store"
import { User } from "../types/types-user";

export const loadUsers = createAction('[User] Load Users');
export const  loadSuccessUser = createAction("[User], Load users Success", props<{users:User[]}>());

export const addUser = createAction("[User] Add User", props<{user: User}>());


export const filterUsers = createAction("[User] Filter users", props<{name: string}>());
export const filterUserSuccess = createAction("[User] Filter users success", props<{users: User[]}>());
