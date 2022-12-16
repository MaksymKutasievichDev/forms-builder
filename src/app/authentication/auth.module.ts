import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { PasswordStrengthDirective } from "./directives/password-strength.directive";
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordStrengthDirective
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  bootstrap: [LoginComponent]
})
export class AuthModule { }
