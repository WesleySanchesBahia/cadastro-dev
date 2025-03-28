import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DevService } from '../services/dev.service';
import * as userActions from '../stores/user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: DevService) {}

  loaderUsers$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUsers),
    mergeMap(() =>
      this.userService.get().pipe(
        map((users) => userActions.loadSuccessUser({ users })),
        catchError(() => of(userActions.loadSuccessUser({ users: [] })))
      )
    )
  )
  );

  filterUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.filterUsers),
    mergeMap(({name}) =>
      this.userService.getByParams({name}).pipe(
        map(users => userActions.filterUserSuccess({users})),
        catchError(() => of(userActions.filterUserSuccess({users: []})))
      )
    )
  ))
}
