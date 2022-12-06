import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {Router} from "@angular/router";
import {AppStateInterface} from "./services/appState.interface";
import {Store, select} from "@ngrx/store";
import {deleteDataFromState} from "./store/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  username: string = '';

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private store: Store<AppStateInterface>
  ) {

  }

  ngOnInit():void {
    if(!!this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser();
    }
  }


  checkIfLoggedIn():boolean{
    if(!!this.tokenStorageService.getToken()){
      this.username = this.tokenStorageService.getUser();
      return true;
    } else return false
  }

  logout():void {
    this.tokenStorageService.signOut();
    this.router.navigate(['login'])
    this.store.dispatch(deleteDataFromState())
  }
}
