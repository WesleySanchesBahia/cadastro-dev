import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormUserComponent } from './components/form-user/form-user.component';
import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { HeaderComponent } from './components/header/header.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    FormUserComponent,
    CardComponent,
    InputComponent,
    HeaderComponent,
    TextAreaComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    FormUserComponent,
    CardComponent,
    InputComponent,
    HeaderComponent,
    TextAreaComponent,
    LoaderComponent,
  ]
})
export class SharedComponentsModule { }
