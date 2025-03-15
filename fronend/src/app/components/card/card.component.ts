import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  users = [
    {
      githubUsername: 'joaosilva',
      avatarUrl: 'https://avatars.githubusercontent.com/u/57376670?v=4',
      name: 'Wesley Sanches Bahia',
      city: 'Bom sucesso - PR',
      technologies: 'Angular, node.js',
    },
    {
      githubUsername: 'mariasilva',
      avatarUrl: 'https://github.com/mariasilva.png',
      name: 'Maria da Silva',
      city: 'Maringá - PR',
      technologies: 'React, React Native, Vue',
    },
  ];
}
