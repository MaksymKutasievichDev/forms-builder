import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {provideMockStore} from "@ngrx/store/testing";
import {RemoveQuotationMarksPipe} from "./pipes/remove-quotation-marks.pipe";
import {TokenStorageService} from "./services/token-storage.service";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./services/auth.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";

describe('AppComponent', () => {
  let injector: TestBed;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>
  let tokenService: TokenStorageService

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RemoveQuotationMarksPipe,
      ],
      imports: [
        MatIconModule,
        AppRoutingModule,
        RouterTestingModule.withRoutes(
          [{path:'home',redirectTo:''}]
        )
      ],
      providers: [
        provideMockStore({}),
        TokenStorageService
      ]
    }).compileComponents()
    injector = getTestBed();
    tokenService = injector.inject(TokenStorageService)
  })

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
    expect(component.checkIfLoggedIn()).toBeFalsy()
  })
  it('Should return true if there is authKey', () => {
    tokenService.saveToken('dumbToken')
    expect(component.checkIfLoggedIn()).toBeTruthy()
  })

  it('should signOut', () => {
    tokenService.saveToken('dumbToken')
    component.logout()
    expect(component.checkIfLoggedIn()).toBeFalsy()
  })

  it('should upgrade username onInit', () => {
    spyOn(component.isLoading$, 'pipe').and.returnValue(of(false))
    tokenService.saveToken('dumbToken')
    tokenService.saveUser('dumbUser')
    component.ngOnInit()
    expect(component.username).toEqual('"dumbUser"')
    expect(component.isLoading).toEqual(false)
  })
});
