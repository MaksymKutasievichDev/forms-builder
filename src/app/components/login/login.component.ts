import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {SnackBar} from "../../classes/snackBar";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SnackBar implements OnInit {
  form:any = {};
  isLoggedIn = false;
  isLoggedIn$ : Subject<boolean> = new Subject<boolean>();
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService, private tokenStorage:TokenStorageService, snackBar:MatSnackBar ) {
    super(snackBar)
  }

  ngOnInit(): void {
    /*Redirect if logged in*/
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['home'])
      this.infoShow('You are already logged in')
    }
  }

  onSubmit():void {
    /*Login user*/
     this.authService.login(this.form).pipe(takeUntil(this.isLoggedIn$)).subscribe(
      data => {
        if('error' in data){
          this.errorShow(data.error)
        } else {
          this.tokenStorage.saveToken(data.accessToken)
          this.tokenStorage.saveUser(this.form.username);
          this.isLoggedIn = true;
          this.router.navigate(['home'])
          this.successShow('Logged in successfully')
          this.isLoggedIn$.next(true)
          this.isLoggedIn$.unsubscribe()
        }
      })
  }
}
