import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {Subject, first} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {SnackBar} from "../../../shared/directives/snack-bar";
import {AppStateInterface} from "../../../interfaces/app-state.interface";
import {changeLoadingState} from "../../../store/actions";

@Component({
  selector: 'app-checkIfUserExists',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SnackBar implements OnInit {
  form:any = {};
  isLoggedIn = false;
  isLoggedIn$ : Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage:TokenStorageService,
    private store:Store<AppStateInterface>,
    snackBar:MatSnackBar
  ) {
    super(snackBar)
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['home'])
      this.infoShow('You are already logged in')
    }
  }

  onSubmitLogin():void {
    this.store.dispatch(changeLoadingState({isLoading: true}))
    setTimeout(() => {
      this.authService.checkIfUserExistsAndGetToken(this.form).pipe(takeUntil(this.isLoggedIn$)).pipe(first()).subscribe(
        data => {
          if('error' in data){
            this.errorShow(data.error)
            this.store.dispatch(changeLoadingState({isLoading: false}))
          } else {
            this.isLoggedIn = this.authService.loginUserToApplication(
              data.accessToken,
              this.form.username,
              this.isLoggedIn$
            );
            this.successShow('Logged in successfully')
            this.store.dispatch(changeLoadingState({isLoading: false}))
          }
        })
    }, 1000)
  }
}
