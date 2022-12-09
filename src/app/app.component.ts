import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {Router} from "@angular/router";
import {AppStateInterface} from "./services/appState.interface";
import {select, Store} from "@ngrx/store";
import {deleteDataFromState} from "./store/actions";
import {Observable} from "rxjs";
import {changeIsLoading} from "./store/selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title="forms-builder"
  username: string = 'default';

  isLoading$: Observable<any>
  isLoading: boolean

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private store: Store<AppStateInterface>
  ) {
    this.isLoading$ = this.store.pipe(select(changeIsLoading))
  }

  ngOnInit():void {
    if(!!this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser();
    }
    this.isLoading$.subscribe(data => this.isLoading = data)
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
