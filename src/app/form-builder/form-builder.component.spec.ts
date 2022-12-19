import {ComponentFixture, TestBed} from "@angular/core/testing";
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


describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent
  let store: MockStore<any>
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
        FormDataMutationService,
        DomSanitizer,
        provideMockStore({initialState}),
        { provide: MAT_COLOR_FORMATS, useValue: {display: { colorInput: 'hex'}} }
      ]
    }).compileComponents()

    store = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(FormBuilderComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set clickedElementIndex on click', () => {
    component.getClickedElementIndex(5)
    expect(component.clickedElementIndex).toEqual(5)
  })

  /*it('should set data on component creation', () => {
    let initState = {
      formStyles: {
        label: 'test'
      },
      templateMap: ['Input', 'Select'],
      elementStyles: '{}{}'
    }
    spyOn((component as any).store, 'pipe').and.returnValue(initState)
    fixture = TestBed.createComponent(FormBuilderComponent)
    component = fixture.componentInstance
    expect(component.formStyles).toEqual({label: 'test'})
  })*/

})
