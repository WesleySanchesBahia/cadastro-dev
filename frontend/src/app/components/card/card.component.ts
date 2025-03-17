import { Component, ElementRef, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { User } from '../../types/types-user';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../../types/types-modal';


@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent  implements OnInit {
  @ViewChild('ContentOfModalUser') contentOfModalUser!: ElementRef<any>

  constructor(private alert:AlertService, private modal: ModalService, private formBuilder:FormBuilder){
    this.formEdit = this.formBuilder.group({
      id: [''],
      githubUsername: [''],
      avatarUrl: [''],
      name: ['', Validators.required],
      email: [''],
      city: ['', Validators.required],
      education: [''],
      technologies: ['', Validators.required],
    });
  }

  dataBaseUsers:Array<User> = [];
  formEdit: FormGroup;
  configModal!:config;
  private isLoader = signal(false);
  loader = () => this.isLoader();
  ngOnInit(): void {

  }

  private updateLocalStorage(dataBase:Array<User>): void{
    localStorage.setItem("dataBase",JSON.stringify(dataBase));
  }

  private getDataBaseLocal(): Array<User>{
    let database =  localStorage.getItem("dataBase")  || "";
    this.dataBaseUsers = JSON.parse(database);

    return this.dataBaseUsers;
  }

  setUsers(user:User): void {
    user.id = crypto.randomUUID();
    this.dataBaseUsers.push(user);
    this.updateLocalStorage(this.dataBaseUsers);
  }

  searchUsers(nameUser:string): void{
    this.getDataBaseLocal();
    if(!nameUser){
      return;
    }
    let name = nameUser.toUpperCase();
    const user = this.dataBaseUsers.filter(u => u.name.toUpperCase().includes(name));
    if(!user){
      this.alert.showInfo("Não foi localizado nenhum usuário com esse nome")
    }
    this.dataBaseUsers = user || [];
  }




  editUser(user:User): void {
    this.modal.open(
      this.configModal ={
        title:"Editar",
        content:this.contentOfModalUser,
        width: "400px",
        maxWidth: "",
        minWidth: "",
        height: "",
        maxHeight: "",
        minHeight: "",
      }
    );

    this.formEdit.setValue(user);
  }


  deleteUser(index:number): void {
    if(index !== -1){
      this.dataBaseUsers.splice(index,1);
    }
    this.updateLocalStorage(this.dataBaseUsers);
  }





  close(): void{
    this.modal.close();
  }

  save():void{
    this.isLoader.set(true);
    const id = this.formEdit.value.id;
    const users = this.getDataBaseLocal();
    const index = users.findIndex(user => user.id === id);
    this.modal.close();
    setTimeout(() => {
      if (index !== -1) {
        users[index] = { ...users[index], ...this.formEdit.value };
      }
      this.isLoader.set(false);
      this.alert.showSuccess("Atualizado com sucesso.")
      this.updateLocalStorage(users);
    }, 1500);
  }


}
