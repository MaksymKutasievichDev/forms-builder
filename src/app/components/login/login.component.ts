import { Component, OnInit } from '@angular/core';
import {reloadPage} from "../../_helpers/helpers";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService, private tokenStorage:TokenStorageService) {}

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['home'])
    }
  }

  onSubmit():void {
    console.log(this.form)
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data);
        if('error' in data){
          this.isLoginFailed = true;
          this.errorMessage = data.error
        } else {
          this.tokenStorage.saveToken(data.accessToken)
          this.tokenStorage.saveUser(this.form.username);
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          reloadPage()
        }
      })
  }
  clearError():void{
    this.isLoginFailed = false;
    this.errorMessage = ''
  }
}
