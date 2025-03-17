import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user.component';
import { SharedComponentsModule } from '../../shared-components.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RegisterUserComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild([
      {
        path:"",
        component: RegisterUserComponent
      }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class RegisterUserModule { }
