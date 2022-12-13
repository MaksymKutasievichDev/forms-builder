import {RegisterComponent} from "./register.component";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppStateInterface} from "../../../interfaces/appState.interface";
import {of} from "rxjs";
import {MatInputModule} from "@angular/material/input";


describe('RegisterComponent', () => {
  let component: RegisterComponent
  let store: MockStore<AppStateInterface>
  let authService: AuthService
  let tokenStorage: TokenStorageService
  let fixture: ComponentFixture<RegisterComponent>

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

  beforeEach(waitForAsync (() => {
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
        RegisterComponent
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
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should update loading status if response has not any errors', fakeAsync(() => {
    tokenStorage.signOut();
    const response:any = {}
    spyOn(authService, 'register').and.returnValues(of(response))
    component.onSubmit()
    tick(2000)
    expect(component.isSuccessful).toEqual(true)
  }))

  it('should return error if response has error', fakeAsync(() => {
    tokenStorage.signOut();
    component.isSuccessful = false
    const response:any = {
      error: 'error'
    }
    spyOn(authService, 'register').and.returnValues(of(response))
    component.onSubmit()
    tick(2000)
    expect(component.isSuccessful).toEqual(false)
  }))
})
