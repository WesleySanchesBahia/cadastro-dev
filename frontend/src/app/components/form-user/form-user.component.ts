import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { DevService } from '../../services/dev.service';

@Component({
  selector: 'app-form-user',
  standalone: false,
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss',
})
export class FormUserComponent {

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private alert: AlertService,
    private service: DevService,
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

  userForm!: FormGroup;
  private gitUrl: string = 'https://api.github.com/users/';
  private isLoader = signal(false);
  loader = () => this.isLoader();
  @Output() registered = new EventEmitter<boolean>();



  buscarUserGitHub(): void {
    const username = this.userForm.value.githubUsername;

    if (!username) {
      this.alert.showInfo('Informe seu GitHub para preencher o formulário.');
      return;
    }

    if (username) {
      this.http.get<any>(`${this.gitUrl}${username}`).subscribe({
        next: (data) => {
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
      this.isLoader.set(true);
      this.service.post(this.userForm.value).subscribe(
        {
          next:(res) => {
            this.alert.showSuccess("Registrado com sucesso!")
            this.userForm.reset();
            this.registered.emit(true);
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          },
          error:(error) => {
            this.alert.showInfo("Erro ao criar resgistro!");
          }
        },

      ).add(() => {
        this.isLoader.set(false);
      })
    }
  }

}
