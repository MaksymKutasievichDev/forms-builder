import {ComponentFixture, discardPeriodicTasks, fakeAsync, getTestBed, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule} from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import * as rxjs from 'rxjs'
import {first, fromEvent, of, Subject, take} from "rxjs";
import { AppComponent } from './app.component';
import { RemoveQuotationMarksPipe } from "./pipes/remove-quotation-marks.pipe";
import { TokenStorageService } from "./services/token-storage.service";
import { AppRoutingModule } from "./app-routing.module";
import { DarkThemeService } from "./services/dark-theme.service";
import {Router} from "@angular/router";
import {FieldStylesComponent} from "./form-builder/components/field-styles/field-styles.component";

describe('AppComponent', () => {
  let injector: TestBed;
  let component: AppComponent;
  let reactiveForms: ReactiveFormsModule
  let fixture: ComponentFixture<AppComponent>
  let tokenService: TokenStorageService
  let darkThemeService: DarkThemeService

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RemoveQuotationMarksPipe,
      ],
      imports: [
        MatIconModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatToolbarModule,
        RouterTestingModule.withRoutes(
          [
            {path:'home',redirectTo:''},
            {path:'auth/checkIfUserExists', redirectTo: ''}
          ]
        )
      ],
      providers: [
        provideMockStore({}),
        TokenStorageService,
        DarkThemeService
      ]
    }).compileComponents()
    injector = getTestBed();
    tokenService = injector.inject(TokenStorageService)
    reactiveForms = TestBed.inject(ReactiveFormsModule)
    darkThemeService = TestBed.inject(DarkThemeService)
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance;
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Should return false if there is no authKey', () => {
    tokenService.signOut()
    expect(component.loggedIn()).toBeFalsy()
  })
  it('Should return true if there is authKey', () => {
    tokenService.saveToken('dumbToken')
    expect(component.loggedIn()).toBeTruthy()
  })

  it('should upgrade username onInit', () => {
    spyOn(component.isDestroyed$, 'pipe').and.returnValue(of(false))
    tokenService.saveToken('dumbToken')
    tokenService.saveUser('dumbUser')
    component.ngOnInit()
    expect(component.username).toEqual('"dumbUser"')
  })

  it('should set DarkMode if its set to true in session storage', () => {
    spyOn(component.isDestroyed$, 'pipe').and.returnValue(of(false))
    component.darkThemeToggler.setValue(true)
    component.ngOnInit()
    expect(component.className).toEqual('darkMode')
  })

  it('should not set DarkMode if its set to false in session storage', () => {
    spyOn(component.isDestroyed$, 'pipe').and.returnValue(of(false))
    component.darkThemeToggler.setValue(false)
    expect(darkThemeService.getStatus()).toEqual('false')
  })

  it('should log out', () => {
    const router: Router = TestBed.inject(Router)
    spyOn(router, 'navigate')
    component.logout()
    expect(component.loggedIn()).toBeFalsy()
    expect(router.navigate).toHaveBeenCalled()
  })

  it('should update mobileView when window is resized', fakeAsync(() => {
    const eventObservable = fromEvent(window, 'resize').pipe(first());
    spyOnProperty(window, 'innerWidth').and.returnValue(475);
    eventObservable.subscribe(() => {
      expect(component.mobileView).toBe(true);
      tick()
    });
    component.ngOnInit()
    window.dispatchEvent(new Event('resize'));
  }));

  it('should set isLoading from store data', () => {
    spyOn((component as any).store, 'pipe').and.returnValue(of(true))
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    expect(component.isLoading).toEqual(true)
  })
});
