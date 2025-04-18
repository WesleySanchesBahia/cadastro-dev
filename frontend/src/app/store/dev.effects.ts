import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DevService } from '../services/dev.service';
import * as DevAcoes from '../store/dev.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class DevsEffects {
  constructor(private acoes$: Actions, private service: DevService) {}

  buscarDevs$ = createEffect(() =>
    this.acoes$.pipe(
      ofType(DevAcoes.buscarDevs),
      switchMap(() =>
        this.service.get().pipe(
          map((devs) => DevAcoes.buscarDevsComSucesso({ devs })),
          catchError((erro) =>
            of(DevAcoes.buscarDevsComErro({ erro: erro.message }))
          )
        )
      )
    )
  );

  buscarDevPorFiltro$ = createEffect(() =>
    this.acoes$.pipe(
      ofType(DevAcoes.buscarDevPorFiltro),
      switchMap((acao) =>
        this.service.getByParams({ name: acao.name }).pipe(
          map((devs) => DevAcoes.buscarDevPorFiltroComSucesso({ devs })),
          catchError((erro) =>
            of(DevAcoes.buscarDevPorFiltroErro({ erro: erro.message }))
          )
        )
      )
    )
  );

  cadastrarNovoDev$ = createEffect(() =>
    this.acoes$.pipe(
      ofType(DevAcoes.cadastrarNovoDev),
      switchMap((acao) =>
        this.service.post(acao.novoDev).pipe(
          map((devs) => DevAcoes.cadastrarNovoDevComSucesso({devs})),
          catchError((error) =>
          of(DevAcoes.cadastrarNovoDevErro({erro:error.message}))
          )
        )
      )
    )
  )
}
