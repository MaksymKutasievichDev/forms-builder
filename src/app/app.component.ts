import {Component, HostBinding, OnInit, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {TokenStorageService} from "./services/token-storage.service";
import {AppStateInterface} from "./interfaces/app-state.interface";
import {deleteDataFromState} from "./store/actions";
import {changeIsLoading} from "./store/selectors";
import {DarkThemeService} from "./services/dark-theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  @HostBinding('class') className = ''

  title="Form Builder"
  username: string | null = 'default';

  isLoading: boolean

  darkThemeToggler = new FormControl(false)

  isDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private darkThemeService: DarkThemeService,
    private store: Store<AppStateInterface>
  ) {
    this.store
      .pipe(select(changeIsLoading))
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(data => {
        this.isLoading = data
      }
    )

    this.darkThemeToggler.valueChanges
      .subscribe((darkMode) => {
        darkMode ? this.className = 'darkMode' : this.className = ''
        this.darkThemeService.setStatus(this.darkThemeToggler.value)
      }
    )
    this.darkThemeToggler.setValue(this.darkThemeService.getStatus() === 'true')
  }

  ngOnInit():void {
    if(!!this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser();
    }
  }

  loggedIn():boolean{
    if(!!this.tokenStorageService.getToken()){
      this.username = this.tokenStorageService.getUser();
      return true;
    }
    return false
  }

  logout():void {
    this.tokenStorageService.signOut();
    this.router.navigate(['auth/login'])
    this.store.dispatch(deleteDataFromState())
  }

  ngOnDestroy() {
    this.isDestroyed$.next(true)
    this.isDestroyed$.unsubscribe()
  }
}
