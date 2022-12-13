import {FormBuilderComponent} from "./form-builder.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ComponentFixture, fakeAsync, TestBed, waitForAsync} from "@angular/core/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {of} from 'rxjs'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {HttpClientModule} from "@angular/common/http";
import {TokenStorageService} from "../../../services/token-storage.service";
import {AuthService} from "../../../services/auth.service";
import {FormStylesComponent} from "../form-styles/form-styles.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MAT_COLOR_FORMATS, NgxMatColorPickerModule} from "@angular-material-components/color-picker";
import {MatSelectModule} from "@angular/material/select";
import {FieldStylesComponent} from "../field-styles/field-styles.component";
import {MatIconModule} from "@angular/material/icon";


describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent
  let store: MockStore<any>
  let fixture: ComponentFixture<FormBuilderComponent>
  let http:HttpClientModule;
  let tokenStorage: TokenStorageService
  let authService: AuthService;

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
        TokenStorageService,
        AuthService,
        provideMockStore({initialState}),
        { provide: MAT_COLOR_FORMATS, useValue: {display: { colorInput: 'hex'}} }
      ]
    }).compileComponents()

    store = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(FormBuilderComponent)
    component = fixture.componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set all form data onInit', fakeAsync(() => {
    const responseElements:any = ['Input', 'Select', 'Button']
    spyOn(component.formTemplateMap$, 'pipe').and.returnValue(of(responseElements))
    const responseElementsStyle:any = '[{\"label\":\"Lable\"},{},{},{\"label\":\"Label\",\"placeholder\":\"New plchldr\",\"color\":\"#adaf2a\",\"borderColor\":\"#38e815\"},{\"label\":\"Login\",\"color\":\"#b926b7\",\"borderColor\":\"#00ddff\",\"borderStyle\":\"solid\"}]'
    spyOn(component.formElementsStyles$, 'pipe').and.returnValue(of(responseElementsStyle))
    const responseFormStyles:any = {
      label: 'new',
      color: '#000000',
      background: '#000000',
      borderStyle: 'dashed',
      borderColor: '#000000'
    }
    spyOn(component.formStylesSelect$, 'pipe').and.returnValue(of(responseFormStyles))
    // @ts-ignore
    spyOn(component.formDataForDownload$, 'subscribe').and.returnValue(of([]))
    component.ngOnInit()
    expect(component.formTemplateMapSelector).toEqual(['Input', 'Select', 'Button'])
    expect(component.formElementsStylesSelector.length).toEqual(5)
    expect(component.formStylesSelectorObs).toEqual({
      label: 'new',
      color: '#000000',
      background: '#000000',
      borderStyle: 'dashed',
      borderColor: '#000000'
    })
  }));

  it('should set clickedElementIndex on click', () => {
    component.getClickedElementIndex(5)
    expect(component.clickedElementIndex).toEqual(5)
  })


})
