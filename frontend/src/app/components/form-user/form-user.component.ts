import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-form-user',
  standalone: false,
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss',
})
export class FormUserComponent {
  userForm!: FormGroup;
  private gitUrl: string = 'https://api.github.com/users/';
  loader: boolean = false;
  @Output() userEmitter = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private alert: AlertService
  ) {
    this.userForm = this.formBuilder.group({
      githubUsername: [''],
      avatarUrl: [''],
      name: ['', Validators.required],
      email: [''],
      city: ['', Validators.required],
      education: [''],
      technologies: ['', Validators.required],
    });
  }

  buscarUserGitHub(): void {
    const username = this.userForm.value.githubUsername;

    if (!username) {
      this.alert.showInfo('Informe o GitHub para preencher o formulário.');
      return;
    }

    if (username) {
      this.http.get<any>(`${this.gitUrl}${username}`).subscribe({
        next: (data) => {
          if (!data) {
            this.alert.showInfo('GitHub não encontrado.');
            return;
          }
          this.userForm.patchValue({
            avatarUrl: data.avatar_url,
            name: data.name || '',
            email: data.email || '',
            city: data.location || '',
          });
        },
        error:() =>{
          this.alert.showError("Usuário não encontrado");
        }
      });
    }
  }

  submit(): void {
    if (this.userForm.valid) {
      this.loader = true;
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        this.loader = false;
        this.alert.showSuccess('Cadastro realizado com sucesso!');
        this.userEmitter.emit(this.userForm.value);
        this.userForm.reset();
      }, 1500);
    }
  }
}
