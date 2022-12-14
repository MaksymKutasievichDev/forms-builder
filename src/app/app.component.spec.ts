import {ComponentFixture, fakeAsync, getTestBed, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { MatIconModule } from "@angular/material/icon";
import { of } from "rxjs";
import { AppComponent } from './app.component';
import { RemoveQuotationMarksPipe } from "./pipes/remove-quotation-marks.pipe";
import { TokenStorageService } from "./services/token-storage.service";
import { AppRoutingModule } from "./app-routing.module";

describe('AppComponent', () => {
  let injector: TestBed;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>
  let tokenService: TokenStorageService

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RemoveQuotationMarksPipe,
      ],
      imports: [
        MatIconModule,
        AppRoutingModule,
        RouterTestingModule.withRoutes(
          [
            {path:'home',redirectTo:''},
            {path:'auth/login', redirectTo: ''}
          ]
        )
      ],
      providers: [
        provideMockStore({}),
        TokenStorageService
      ]
    }).compileComponents()
    injector = getTestBed();
    tokenService = injector.inject(TokenStorageService)
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
    expect(component.checkIfLoggedIn()).toBeFalsy()
  })
  it('Should return true if there is authKey', () => {
    console.log(tokenService.getToken())
    tokenService.saveToken('dumbToken')
    console.log(tokenService.getToken())
    expect(component.checkIfLoggedIn()).toBeTruthy()
  })

  it('should signOut', () => {
    tokenService.signOut()
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
