import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {of} from "rxjs";
import {LoginComponent} from "./login.component";
import {AppStateInterface} from "../../../interfaces/app-state.interface";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";


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
    spyOn(authService, 'checkIfUserExistsAndGetToken').and.returnValues(of({}))
    component.onSubmitLogin()
    tick(2000)
    expect(component.isLoggedIn).toEqual(true)
  }))

  it('should return error if response has error', fakeAsync(() => {
    tokenStorage.signOut();
    component.isLoggedIn = false
    spyOn(authService, 'checkIfUserExistsAndGetToken').and.returnValues(of({error: 'yes'}))
    component.onSubmitLogin()
    tick(2000)
    expect(component.isLoggedIn).toEqual(false)
  }))

})
