import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {FormBuilderComponent} from "./components/form-builder/form-builder.component";
import {RegisterComponent} from './components/register/register.component';
import {IsAuthenticatedGuard} from "./services/is-authenticated";

const routes: Routes = [
  { path: 'home', component: FormBuilderComponent, canActivate: [IsAuthenticatedGuard]},
  { path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
