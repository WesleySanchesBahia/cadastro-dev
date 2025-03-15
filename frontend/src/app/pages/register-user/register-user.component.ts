import { Component } from '@angular/core';
import { User } from '../../types/types-user';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  users:Array<User> =[];



  getUsers(data:User): void {
    this.users.push(data);
  }
}
