import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { User } from '../../types/types-user';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../../types/types-modal';
import { DevService } from '../../services/dev.service';

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
    private service: DevService
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
  }

  dataBaseUsers: Array<User> = [];
  formEdit: FormGroup;
  configModal!: config;
  nameSearch!: string;
  private isLoader = signal(false);
  loader = () => this.isLoader();

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void{
    this.service.get().subscribe({
      next:(res) => {
        if(res.content){}
        this.dataBaseUsers = res.content;
      },
      error:(e) => {

      }
    })
  }

  private updateLocalStorage(dataBase: Array<User>): void {
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
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
        this.dataBaseUsers = dev.content
      },
      error:() => {
        this.alert.showError("Erro ao realizar essa ação!")
      }
    })
  }

  editUser(user: User): void {
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

    this.formEdit.patchValue(user);
  }

  deleteUser(index: number): void {
    if (index !== -1) {
      this.dataBaseUsers.splice(index, 1);
    }
    this.updateLocalStorage(this.dataBaseUsers);
  }

  close(): void {
    this.modal.close();
  }

  updateDev(): void {
    this.isLoader.set(true);
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
      this.isLoader.set(false);
    })

  }
}
