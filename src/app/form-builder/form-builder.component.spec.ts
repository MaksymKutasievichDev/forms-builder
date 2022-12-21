import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MAT_COLOR_FORMATS, NgxMatColorPickerModule} from "@angular-material-components/color-picker";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilderComponent} from "./form-builder.component";
import {FormStylesComponent} from "./components/form-styles/form-styles.component";
import {FieldStylesComponent} from "./components/field-styles/field-styles.component";
import {FormDataMutationService} from "./services/form-data-mutations.service";
import {AuthService} from "../authentication/services/auth.service";
import {of, throwError} from "rxjs";


describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent
  let store: MockStore<any>
  let authService: AuthService
  let fixture: ComponentFixture<FormBuilderComponent>

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        MatSnackBarModule,
        MatExpansionModule,
        DragDropModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        DragDropModule,
        ReactiveFormsModule,
        NgxMatColorPickerModule,
        NgxMatColorPickerModule,
        MatSelectModule,
        MatIconModule
      ],
      declarations:[
        FormBuilderComponent,
        FormStylesComponent,
        FieldStylesComponent
      ],
      providers: [
        AuthService,
        FormDataMutationService,
        DomSanitizer,
        provideMockStore({initialState}),
        { provide: MAT_COLOR_FORMATS, useValue: {display: { colorInput: 'hex'}} }
      ]
    }).compileComponents()

    authService = TestBed.inject(AuthService)
    store = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(FormBuilderComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    component.ngOnInit()
    expect(component).toBeTruthy()
  })

  it('should set clickedElementIndex on click', () => {
    component.getClickedElementIndex(5)
    expect(component.clickedElementIndex).toEqual(5)
  })

  it('should block', () => {
    expect(component.blockDropping()).toBeFalsy()
  })

  it('should through error on save', () => {
    spyOn(authService, 'saveFormToDb').and.returnValues(throwError(() => new Error()))
    component.saveMap()
    expect(authService.saveFormToDb).toHaveBeenCalled()
  })
  it('should through error string on save', () => {
    spyOn(authService, 'saveFormToDb').and.returnValues(throwError(() => ({error: 'error'})))
    component.saveMap()
    expect(authService.saveFormToDb).toHaveBeenCalled()
  })

  it('should through error string on save', fakeAsync(() => {
    spyOn(authService, 'saveFormToDb').and.returnValues(of({}))
    component.saveMap()
    tick(2000)
    expect(authService.saveFormToDb).toHaveBeenCalled()
  }))
})
