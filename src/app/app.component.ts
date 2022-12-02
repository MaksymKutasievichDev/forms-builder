import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoggedIn = false;
  username: string = '';

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {

  }

  ngOnInit():void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      this.username = this.tokenStorageService.getUser();
    }
  }

  checkIfLoggedIn():boolean{
    if(!!this.tokenStorageService.getToken()){
      this.username = this.tokenStorageService.getUser();
        return true;
    } else {
      return false
    }
  }

  logout():void {
    this.tokenStorageService.signOut();
    this.router.navigate(['login'])
  }
}
