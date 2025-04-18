import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EstadoDev } from '../../store/dev.states';
import { buscarDevPorFiltro } from '../../store/dev.actions';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  {
  @Output() sendSearch = new EventEmitter<any>();

  form!:FormGroup;

  constructor(private fotmBuilder: FormBuilder, private store:Store<{dev:EstadoDev}>){
    this.form = this.fotmBuilder.group({
      search: [""],
    })
  }

  searchDev(): void{
    const name = this.form.get("search")?.value;
    this.store.dispatch(buscarDevPorFiltro({name:name}))
  }
}
