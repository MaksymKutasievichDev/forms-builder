import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {}
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService, private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isSuccessful = true
      this.router.navigate(['home'])
    }
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      this.tokenStorage.saveToken(data.accessToken)
        this.tokenStorage.saveUser(this.form.username);
        this.reloadPage();
    })
  }

  reloadPage():void {
    window.location.reload()
  }
}
