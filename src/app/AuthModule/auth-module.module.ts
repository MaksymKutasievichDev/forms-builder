import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RegisterComponent } from "./components/register/register.component";
import { PasswordStrengthDirective } from "./directives/password-strength.directive";
import { AuthRoutingModule } from "./auth-routing.module";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordStrengthDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthRoutingModule
  ],
  bootstrap: [LoginComponent]
})
export class AuthModule { }
