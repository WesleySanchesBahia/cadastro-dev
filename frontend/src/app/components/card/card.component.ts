import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { User } from '../../types/types-user';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent  implements OnInit {
  @ViewChild('ContentOfModalUser') contentOfModalUser!: ElementRef<any>
  dataBaseUsers:Array<User> = [];

  constructor(private alert:AlertService, private modal: ModalService){}



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
    this.dataBaseUsers.push(user);
    this.updateLocalStorage(this.dataBaseUsers);
  }


  editUser(): void {
    this.modal.open();
  }

  deleteUser(index:number): void {
    if(index !== -1){
      this.dataBaseUsers.splice(index,1);
    }
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




}
