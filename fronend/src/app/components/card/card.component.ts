import { Component } from '@angular/core';

type Users = {
  githubUsername:string,
  avatarUrl:string,
  name:string,
  city:string,
  technologies:string;
}
@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  users:Array<Users> = [

  ];
}
