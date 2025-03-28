import { createReducer, on } from "@ngrx/store";
import * as userActions from '../stores/user.actions';
import { User } from "../types/types-user";


export interface UserState{
  users:User[],
  filterUsers:User[],
}


export const initalState:UserState = {
  users:[],
  filterUsers:[],
}


export const reducer = createReducer(
  initalState,
  on(userActions.loadSuccessUser, (state, {users}) => ({...state, users, filterUsers:users})),
  on(userActions.addUser, (state, {user}) => {
    const updateUsers = [...state.users, user]
    return {...state, users:updateUsers, filterUsers:updateUsers}
  }),
  on(userActions.filterUserSuccess, (state, { users }) => ({ ...state, filteredUsers: users }))
)
