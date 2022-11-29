import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoggedIn = false;
  username: string = '';

  constructor(private tokenStorageService: TokenStorageService) {

  }

  ngOnInit():void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      this.username = this.tokenStorageService.getUser().slice(1, -1);
    }
  }

  logout():void {
    this.tokenStorageService.signOut();
    window.location.reload()
  }
}
