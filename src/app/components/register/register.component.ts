import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {SnackBar} from "../../classes/snackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subject, first} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../services/appState.interface";
import {changeLoadingState} from "../../store/actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends SnackBar implements OnInit {

  form: any = {}
  isSuccessful = false;

  testMessage: string = "Hello world)))"

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
      this.isSuccessful = true
      this.router.navigate(['home'])
      this.infoShow('You are already logged in')
    }
  }

  onSubmit(): void {
    this.store.dispatch(changeLoadingState({isLoading: true}))
    /*Register user*/
    setTimeout(() => {
      this.authService.register(this.form).pipe(takeUntil(this.isLoggedIn$)).pipe(first()).subscribe(
        data => {
        if('error' in data){
          this.errorShow(data.error)
          this.store.dispatch(changeLoadingState({isLoading: false}))
        } else {
          this.isSuccessful = true;
          this.tokenStorage.saveToken(data.accessToken)
          this.tokenStorage.saveUser(this.form.username);
          this.router.navigate(['home'])
          this.successShow('Registered successfully')
          this.isLoggedIn$.next(true)
          this.isLoggedIn$.unsubscribe()
          this.store.dispatch(changeLoadingState({isLoading: false}))
        }
      })
    }, 1000)
  }
}
