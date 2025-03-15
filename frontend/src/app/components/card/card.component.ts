import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../types/types-user';


@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent  implements OnInit {
  @Input() dataUsers:Array<User> =[];

  users:Array<User> = [

  ];
  ngOnInit(): void {
    this.users = this.dataUsers;
  }
}
