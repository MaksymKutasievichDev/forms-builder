import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormBuilder, FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {Router} from "@angular/router";
import {of, throwError} from "rxjs";
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
  let formBuilder: FormBuilder;

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
        FormBuilder,
        provideMockStore({initialState})
      ]
    }).compileComponents()
    store = TestBed.inject(MockStore)
    authService = TestBed.inject(AuthService)
    tokenStorage = TestBed.inject(TokenStorageService)
    formBuilder = TestBed.inject(FormBuilder)
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should update username if response has not any errors', fakeAsync(() => {
    component.ngOnInit()
    tokenStorage.signOut();
    component.form.setValue({
      username: 'user',
      password: '1111'
    })
    spyOn(authService, 'checkIfUserExistsAndGetToken').and.returnValues(of({}))
    component.onSubmitLogin()
    tick(2000)
    expect(tokenStorage.getUser()).toEqual('"user"')
  }))

  it('should return error if response has error but hasnt any info', fakeAsync(() => {
    component.ngOnInit()
    tokenStorage.signOut();
    component.form.setValue({
      username: 'user',
      password: '1111'
    })
    spyOn(authService, 'checkIfUserExistsAndGetToken').and.returnValues(throwError(() => new Error()))
    component.onSubmitLogin()
    tick(2000)
    expect(tokenStorage.getUser()).toEqual(null)
  }))

  it('should return default error if response has error', fakeAsync(() => {
    component.ngOnInit()
    tokenStorage.signOut();
    component.form.setValue({
      username: 'user',
      password: '1111'
    })
    spyOn(authService, 'checkIfUserExistsAndGetToken').and.returnValues(throwError(() => ({error: 'error'})))
    component.onSubmitLogin()
    tick(2000)
    expect(tokenStorage.getUser()).toEqual(null)
  }))

  it('should show success message and navigate to home', fakeAsync(() => {
    window.sessionStorage.setItem('auth-token', 'some-dumb-token')
    const router: Router = TestBed.inject(Router)
    spyOn(router, 'navigate')
    component.ngOnInit()
    spyOn(component, 'infoShow')
    tick(2000)
    expect(router.navigate).toHaveBeenCalled()
  }))
})
