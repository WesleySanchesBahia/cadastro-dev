import { createReducer, on } from "@ngrx/store";
import { stateInicial } from "./dev.states";
import { atualizarCadastroDev, atualizarCadastroDevComSucesso, atualizarCadastroErro, buscarDevPorFiltro, buscarDevPorFiltroComSucesso, buscarDevPorFiltroErro, buscarDevs, buscarDevsComErro, buscarDevsComSucesso, cadastrarNovoDev, cadastrarNovoDevComSucesso, cadastrarNovoDevErro, deletarCadastroDev, deletarCadastroDevComSucesso, deletarCadastroErro } from "./dev.actions";

export const devsReducer = createReducer(
  stateInicial,
  on(buscarDevs, (estado) =>({...estado, carregando:true})),
  on(buscarDevsComSucesso, (estado, {devs}) => ({...estado, devs,carregando:false})),
  on(buscarDevsComErro, (estado, { erro }) => ({ ...estado, erro, carregando: false })),

  on(buscarDevPorFiltro, (estado, {name}) =>({...estado, name, carregando:true })),
  on(buscarDevPorFiltroComSucesso, (estado,{devs}) => ({...estado, devs, carregando:false})),
  on(buscarDevPorFiltroErro, ((estado,{erro}) => ({...estado, erro, carregando:false}))),

  on(cadastrarNovoDev, (estado, {novoDev})=> ({...estado, novoDev, carregando:true})),
  on(cadastrarNovoDevComSucesso, (estado,{devs}) => ({...estado, devs, carregando:false})),
  on(cadastrarNovoDevErro, (estado, {erro}) => ({...estado, erro, carregando:false})),

  on(atualizarCadastroDev, (estado,{atualizarDev}) => ({...estado, atualizarDev, carregando:true})),
  on(atualizarCadastroDevComSucesso, (estado, {devs}) => ({...estado, devs, carregando:false})),
  on(atualizarCadastroErro, (estado, {erro}) => ({...estado, erro, carregando:false})),

  on(deletarCadastroDev, (estado, {id}) => ({...estado, id, carregando:true})),
  on(deletarCadastroDevComSucesso, (estado, {deletado}) => ({...estado, deletado, carregando:false})),
  on(deletarCadastroErro, (estado, {erro})=>({...estado, erro, carregando:false}))
)
