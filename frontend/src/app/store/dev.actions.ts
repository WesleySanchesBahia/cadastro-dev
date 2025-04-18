import { createAction, props } from "@ngrx/store";
import { Dev } from "../types/types-dev";

// Ação para buscar  devs
export const buscarDevs = createAction('[Devs]Buscar devs');
export const buscarDevsComSucesso = createAction('[Devs] Buscar com sucesso', props<{devs:Dev[]}>());
export const buscarDevsComErro = createAction('[Devs] Buscar Devs Erro',props<{ erro: any }>()
);


// Ação para buscar devs com parametros
export const buscarDevPorFiltro = createAction('[Devs] Buscar com filtro',props<{name:string}>());
export const buscarDevPorFiltroComSucesso = createAction('[Devs] Buscar com filtro sucesso', props<{devs:Dev[]}>());
export const buscarDevPorFiltroErro = createAction('[Devs] Buscar com filtro erro', props<{erro:any}>())
