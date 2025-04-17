import { Component, ViewChild } from '@angular/core';
import { User } from '../../types/types-user';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  @ViewChild("Appcard") card!: CardComponent;
  users:Array<User> =[];


  getAllUsers(): void {
   this.card.getUsers();
  }

  search(userName:string): void{
    this.card.searchUsers(userName);
  }
}
