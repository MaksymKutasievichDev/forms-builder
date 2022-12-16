import {ComponentFixture, fakeAsync, getTestBed, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { MatIconModule } from "@angular/material/icon";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import { of } from "rxjs";
import { AppComponent } from './app.component';
import { RemoveQuotationMarksPipe } from "./pipes/remove-quotation-marks.pipe";
import { TokenStorageService } from "./services/token-storage.service";
import { AppRoutingModule } from "./app-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";

describe('AppComponent', () => {
  let injector: TestBed;
  let component: AppComponent;
  let reactiveForms: ReactiveFormsModule
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
        TokenStorageService
      ]
    }).compileComponents()
    injector = getTestBed();
    tokenService = injector.inject(TokenStorageService)
    reactiveForms = TestBed.inject(ReactiveFormsModule)
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
    tokenService.saveToken('dumbToken')
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

  it('should set DarkMode if its set to true in session storage', () => {
    spyOn(component.isLoading$, 'pipe').and.returnValue(of(false))
    tokenService.setDarkMode(true)
    component.ngOnInit()
    expect(component.className).toEqual('darkMode')
  })

  it('should not set DarkMode if its set to false in session storage', () => {
    spyOn(component.isLoading$, 'pipe').and.returnValue(of(false))
    component.toggleDarkMode.setValue(false)
    tokenService.setDarkMode(false)
    component.ngOnInit()
    expect(component.toggleDarkMode.value).toEqual(false)
  })
});
