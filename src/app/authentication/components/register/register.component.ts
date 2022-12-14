import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {SnackBar} from "../../../shared/directives/snack-bar";
import {AppStateInterface} from "../../../interfaces/app-state.interface";
import {changeLoadingState} from "../../../store/actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends SnackBar implements OnInit {

  form: any = {}
  isSuccessful = false;
  appIsLoading:boolean = false

  isLoggedIn$ : Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage:TokenStorageService,
    snackBar: MatSnackBar,
    private store: Store<AppStateInterface>
  ) {
    super(snackBar)
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isSuccessful = true;
      this.router.navigate(['home']).then()
      this.infoShow('You are already logged in')
    }
  }

  onSubmit(): void {
    this.store.dispatch(changeLoadingState({isLoading: true}))
    this.appIsLoading = true
    /*Register user*/
    setTimeout(() => {
      this.authService.register(this.form).pipe(takeUntil(this.isLoggedIn$)).subscribe(
        data => {
        if('error' in data){
          this.isSuccessful = false;
          this.errorShow(data.error)
          this.store.dispatch(changeLoadingState({isLoading: false}))
        } else {
          this.isSuccessful = true;
          this.tokenStorage.saveToken(data.accessToken)
          this.tokenStorage.saveUser(this.form.username);
          this.router.navigate(['home']).then()
          this.successShow('Registered successfully')
          this.isLoggedIn$.next(true)
          this.isLoggedIn$.unsubscribe()
          this.store.dispatch(changeLoadingState({isLoading: false}))
        }
      })
    }, 1000)
  }
}
