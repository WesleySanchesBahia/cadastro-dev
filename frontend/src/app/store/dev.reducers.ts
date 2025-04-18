import { createReducer, on } from "@ngrx/store";
import { stateInicial } from "./dev.states";
import { buscarDevPorFiltro, buscarDevPorFiltroComSucesso, buscarDevPorFiltroErro, buscarDevs, buscarDevsComErro, buscarDevsComSucesso, cadastrarNovoDev, cadastrarNovoDevComSucesso, cadastrarNovoDevErro } from "./dev.actions";

export const devsReducer = createReducer(
  stateInicial,
  on(buscarDevs, (estado) =>({...estado, carregando:true})),
  on(buscarDevsComSucesso, (estado, {devs}) => ({...estado, devs,carregando:false})),
  on(buscarDevsComErro, (estado, { erro }) => ({ ...estado, erro, carregando: false })),

  on(buscarDevPorFiltro, (estado, {name}) =>({...estado, name, carregando:true })),
  on(buscarDevPorFiltroComSucesso, (estado,{devs}) => ({...estado, devs, carregando:false})),
  on(buscarDevPorFiltroErro, ((estado,{erro}) => ({...estado, erro, carregando:false}))),

  on(cadastrarNovoDev, (estado, {novoDev})=> ({...estado, novoDev, carregando:false})),
  on(cadastrarNovoDevComSucesso, (estado,{devs}) => ({...estado, devs, carregando:false})),
  on(cadastrarNovoDevErro, (estado, {erro}) => ({...estado, erro, carregando:false}))
)
