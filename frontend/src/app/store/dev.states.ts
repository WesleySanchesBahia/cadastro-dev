import { Dev } from "../types/types-dev";

export interface EstadoDev {
  devs:Dev[],
  carregando:boolean,
  erro: any;
}

export const stateInicial:EstadoDev = {
  devs:[],
  carregando:false,
  erro: ""
}
