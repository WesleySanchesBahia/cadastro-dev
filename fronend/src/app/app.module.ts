import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { ListComponent } from './components/list/list.component';
import { InputComponent } from './components/input/input.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { TextAreaComponent } from './components/text-area/text-area.component';

@NgModule({
  declarations: [
    AppComponent,
    FormUserComponent,
    CardComponent,
    ListComponent,
    InputComponent,
    RegisterUserComponent,
    HeaderComponent,
    TextAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
