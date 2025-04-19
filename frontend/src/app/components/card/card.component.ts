import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevService } from '../../services/dev.service';
import { EstadoDev } from '../../store/dev.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { config } from '../../types/types-modal';
import { Dev } from '../../types/types-dev';
import { atualizarCadastroDev, atualizarCadastroDevComSucesso, buscarDevs } from '../../store/dev.actions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @ViewChild('ContentOfModalUser') contentOfModalUser!: ElementRef<any>;

  constructor(
    private alert: AlertService,
    private modal: ModalService,
    private formBuilder: FormBuilder,
    private service: DevService,
    private acoes$: Actions,
    private store:Store<{dev:EstadoDev}>
  ) {
    this.formUpdate = this.formBuilder.group({
      _id: [''],
      githubUsername: [''],
      avatarUrl: [''],
      name: ['', Validators.required],
      email: [''],
      city: ['', Validators.required],
      education: [''],
      technologies: ['', Validators.required],
    });


    this.dataBaseUsers$ = this.store.select((estado) => estado.dev.devs);
    this.loader$ = this.store.select((estado) => estado.dev.carregando);
    this.acoes$.pipe(ofType(atualizarCadastroDevComSucesso)).subscribe({
      next:() =>{
        this.modal.close();
        this.alert.showSuccess('Atualizado com sucesso.');
        this.searchUsers(this.nameSearch);
      },
      error:() => {

      }
    })

  }
  dataBaseUsers$!: Observable<Dev[]>;
  loader$!: Observable<boolean>;

  formUpdate: FormGroup;
  configModal!: config;
  nameSearch!: string;

  ngOnInit(): void {
   this.getUsers();
  }

  close(): void {
    this.modal.close();
  }

  getUsers(): void{
    this.store.dispatch(buscarDevs())
  }

  searchUsers(nameUser: string): void {
    this.nameSearch = nameUser;
    if (!nameUser) {
      this.nameSearch = nameUser;
      this.getUsers();
      return;
    }
    this.service.getByParams({name:this.nameSearch}).subscribe({
      next:(dev)=>{
        this.dataBaseUsers$ = dev.content;
      },
      error:() => {
        this.alert.showError("Erro ao realizar essa ação!")
      }
    })
  }

  editUser(dev: Dev): void {
    this.modal.open(
      (this.configModal = {
        title: 'Editar',
        content: this.contentOfModalUser,
        width: '400px',
        maxWidth: '',
        minWidth: '',
        height: '',
        maxHeight: '',
        minHeight: '',
      })
    );

    this.formUpdate.patchValue(dev);
  }


  updateDev(): void {
    this.store.dispatch(atualizarCadastroDev({atualizarDev:this.formUpdate.value}))
  }

  deleteUser(dev: Dev): void {
    if(dev._id)
    this.service.delete(dev._id).subscribe(
      {
        next:(e) => {
          this.alert.showError("Deletado com sucesso!");
          this.searchUsers(this.nameSearch);
        },
        error:() => {
          this.alert.showError("Erro ao realizar essa ação!")
        }
      }
    ).add(() => {
    })
  }
}
