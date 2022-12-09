import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {provideMockStore} from "@ngrx/store/testing";
import {RemoveQuotationMarksPipe} from "./pipes/remove-quotation-marks.pipe";
import {TokenStorageService} from "./services/token-storage.service";
import {AuthService} from "./services/auth.service";
import {HttpTestingController} from "@angular/common/http/testing";

describe('AppComponent', () => {
  let injector: TestBed;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>
  let tokenService: TokenStorageService

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RemoveQuotationMarksPipe
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
});
