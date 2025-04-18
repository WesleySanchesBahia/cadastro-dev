import { Component, ViewChild } from '@angular/core';
import { Dev } from '../../types/types-dev';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  constructor(){

  }

  @ViewChild("Appcard") card!: CardComponent;
  users:Array<Dev> =[];


  getAllUsers(): void {
   this.card.getUsers();
  }

  search(userName:string): void{
    this.card.searchUsers(userName);
  }
}
