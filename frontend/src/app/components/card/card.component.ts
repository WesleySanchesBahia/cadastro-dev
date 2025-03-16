import { Component, OnInit } from '@angular/core';
import { User } from '../../types/types-user';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent  implements OnInit {

  dataBaseUsers:Array<User> = [];

  constructor(private alert:AlertService){}



  ngOnInit(): void {

  }

  setUsers(user:User): void {
    this.dataBaseUsers.push(user);
    this.setUserLocalStorage(this.dataBaseUsers);
  }


  private setUserLocalStorage(dataBase:Array<User>): void{
    localStorage.setItem("dataBase",JSON.stringify(dataBase));
  }


   deleteUser(index:number): void {
    if(index !== -1){
      this.dataBaseUsers.splice(index,1);
    }
    this.setUserLocalStorage(this.dataBaseUsers);
  }

  searchUsers(nameUser:string): void{
    if(!nameUser){
      let database =  localStorage.getItem("dataBase")  || "";
      this.dataBaseUsers = JSON.parse(database);
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
