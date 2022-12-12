import {LoginComponent} from "./login.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppStateInterface} from "../../services/appState.interface";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RegisterComponent} from "../register/register.component";
import {of} from "rxjs";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let store: MockStore<AppStateInterface>
  let authService: AuthService
  let tokenStorage: TokenStorageService
  let fixture: ComponentFixture<LoginComponent>

  const initialState = {
    isLoading: false,
    form:{
      templateMap: [],
      formStyles: {},
      elementStyles:'',
      token:''
    },
    error: null
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        RouterTestingModule.withRoutes(
          [{path:'home',redirectTo:''}]
        )
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        AuthService,
        {
          provide: TokenStorageService,
          useValue: {
            signOut: () => window.sessionStorage.clear()
          }
        },
        TokenStorageService,
        provideMockStore({initialState})
      ]
    }).compileComponents()
    store = TestBed.inject(MockStore)
    authService = TestBed.inject(AuthService)
    tokenStorage = TestBed.inject(TokenStorageService)
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should update logged status if response has not any errors', fakeAsync(() => {
    tokenStorage.signOut();
    const response:any = {}
    spyOn(authService, 'login').and.returnValues(of(response))
    component.onSubmit()
    tick(2000)
    expect(component.isLoggedIn).toEqual(true)
  }))

  it('should return error if response has error', fakeAsync(() => {
    tokenStorage.signOut();
    component.isLoggedIn = false
    const response:any = {
      error: 'error'
    }
    spyOn(authService, 'login').and.returnValues(of(response))
    component.onSubmit()
    tick(2000)
    expect(component.isLoggedIn).toEqual(false)
  }))

})
