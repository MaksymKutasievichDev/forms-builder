import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup} from "@angular/forms";
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
  form: FormGroup
  isLoggedIn$ : Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorageService:TokenStorageService,
    private formBuilder:FormBuilder,
    private store:Store<AppStateInterface>,
    snackBar:MatSnackBar
  ) {
    super(snackBar)
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })
    if(this.tokenStorageService.getToken()) {
      this.router.navigate(['home'])
      this.infoShow('You are already logged in')
    }
  }

  onSubmitLogin():void {
    this.store.dispatch(changeLoadingState({isLoading: true}))
    this.authService.checkIfUserExistsAndGetToken(this.form.value)
      .pipe(takeUntil(this.isLoggedIn$))
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.authService.loginUserToApplication(
            data.accessToken,
            this.form.value.username,
            this.isLoggedIn$
          );
          this.successShow('Logged in successfully')
          this.store.dispatch(changeLoadingState({isLoading: false}))
        },
        error: (error) => {
          typeof error.error == 'string' ? this.errorShow(error.error) : this.errorShow("Can't connect to the server")
          this.store.dispatch(changeLoadingState({isLoading: false}))
        }
      })
  }
}
