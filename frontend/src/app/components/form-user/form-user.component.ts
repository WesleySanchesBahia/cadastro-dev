import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Store } from '@ngrx/store';
import { EstadoDev } from '../../store/dev.states';
import { Observable } from 'rxjs';
import {
  cadastrarNovoDev,
  cadastrarNovoDevComSucesso,
} from '../../store/dev.actions';
import { Actions, ofType } from '@ngrx/effects';

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
    private acoes$: Actions,
    private store: Store<{ dev: EstadoDev }>
  ) {
    this.formDev = this.formBuilder.group({
      githubUsername: [''],
      avatarUrl: [''],
      name: ['', Validators.required],
      email: [''],
      city: ['', Validators.required],
      education: [''],
      technologies: ['', Validators.required],
    });

    this.loader$ = this.store.select((estado) => estado.dev.carregando);
    this.acoes$.pipe(ofType(cadastrarNovoDevComSucesso)).subscribe({
      next: (res) => {
        this.alert.showSuccess('Registrado com sucesso!');
        this.formDev.reset();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      error: (err) => {
        this.alert.showError('Usuário não encontrado');
      },
    });
  }

  formDev!: FormGroup;
  private gitUrl: string = 'https://api.github.com/users/';

  loader$ = new Observable();
  @Output() registered = new EventEmitter<boolean>();

  buscarUserGitHub(): void {
    const username = this.formDev.value.githubUsername;
    if (!username) {
      this.alert.showInfo('Informe seu GitHub para preencher o formulário.');
      return;
    }
    if (username) {
      this.http.get<any>(`${this.gitUrl}${username}`).subscribe({
        next: (data) => {
          this.formDev.patchValue({
            avatarUrl: data.avatar_url,
            name: data.name || '',
            email: data.email || '',
            city: data.location || '',
          });
        },
        error: () => {},
      });
    }
  }

  submit(): void {
    if (this.formDev.valid) {
      const dev = this.formDev.value;
      this.store.dispatch(cadastrarNovoDev({ novoDev: dev }));
    }
  }
}
