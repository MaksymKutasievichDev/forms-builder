import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from "./services/is-authenticated";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./form-builder/form-builder.module')
      .then(m => m.FormBuilderModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/auth.module')
      .then(m => m.AuthModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
