import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "./services/token-storage.service";
import {AppStateInterface} from "./interfaces/app-state.interface";
import {deleteDataFromState} from "./store/actions";
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
    this.isLoading$.pipe().subscribe(data => this.isLoading = data)
  }


  checkIfLoggedIn():boolean{
    if(!!this.tokenStorageService.getToken()){
      this.username = this.tokenStorageService.getUser();
      return true;
    } else return false
  }

  logout():void {
    this.tokenStorageService.signOut();
    this.router.navigate(['auth/login'])
    this.store.dispatch(deleteDataFromState())
  }
}
