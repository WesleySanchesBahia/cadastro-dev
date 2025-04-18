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
import { buscarDevs } from '../../store/dev.actions';

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

    private store:Store<{dev:EstadoDev}>
  ) {
    this.formEdit = this.formBuilder.group({
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
  }
  dataBaseUsers$!: Observable<Dev[]>;
  loader$!: Observable<boolean>;

  formEdit: FormGroup;
  configModal!: config;
  nameSearch!: string;

  ngOnInit(): void {
    this.store.dispatch(buscarDevs());
  }

  close(): void {
    this.modal.close();
  }

  getUsers(): void{
    this.service.get().subscribe({
      next:(res) => {
        if(res.content)
        this.dataBaseUsers$ = res.content;
      },
      error:(e) => {

      }
    })
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

    this.formEdit.patchValue(dev);
  }


  updateDev(): void {
    this.service.put(this.formEdit.value).subscribe(
      {
        next:(e:boolean) => {
          if(e){
            this.modal.close();
            this.alert.showSuccess('Atualizado com sucesso.');
            this.searchUsers(this.nameSearch);
          }
        },
        error:(e) => {

        }
      }
    ).add(() => {
    })

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
