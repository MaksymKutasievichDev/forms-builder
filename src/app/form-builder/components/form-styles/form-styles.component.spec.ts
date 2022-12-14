import {FormStylesComponent} from "./form-styles.component";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ComponentFixture, fakeAsync, TestBed, waitForAsync} from "@angular/core/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {of} from 'rxjs'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MAT_COLOR_FORMATS, NgxMatColorPickerModule} from "@angular-material-components/color-picker";
import {MatSelectModule} from "@angular/material/select";


describe('FormStylesComponents', () => {
  let component: FormStylesComponent
  let store: MockStore<any>
  let fixture: ComponentFixture<FormStylesComponent>

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
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        DragDropModule,
        ReactiveFormsModule,
        NgxMatColorPickerModule,
        MatSelectModule
      ],
      declarations:[
        FormStylesComponent
      ],
      providers: [
        provideMockStore({initialState}),
        { provide: MAT_COLOR_FORMATS, useValue: {display: { colorInput: 'hex'}} }
      ]
    }).compileComponents()

    store = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(FormStylesComponent)
    component = fixture.componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set data from store', fakeAsync(() => {
    const response:any = {
      label: 'new',
      color: '#000000',
      background: '#000000',
      borderStyle: 'dashed',
      borderColor: '#000000'
    }
    spyOn(component.formStylesSelect$, 'pipe').and.returnValue(of(response))
    component.ngOnInit()
    expect(component.label.value).toEqual('new')
    expect(component.color.value.hex).toEqual('000000')
    expect(component.background.value.hex).toEqual('000000')
    expect(component.borderStyle.value).toEqual('dashed')
    expect(component.borderColor.value.hex).toEqual('000000')
  }));

  it('should update store values', () => {
    const response:any = {
      label: 'new',
      color: '#000000',
      background: '#000000',
      borderStyle: 'dashed',
      borderColor: '#000000'
    }
    store.setState({
      isLoading: false,
      form:{
        templateMap: [],
        formStyles: {
          label: response.label,
          color: response.color,
          background: response.background,
          borderStyle: response.borderStyle,
          borderColor: response.borderColor,
        },
        elementStyles:'',
        token:''
      },
      error: null
    })
    spyOn(component.formStylesSelect$, 'pipe').and.returnValue(of(response))
    component.ngOnInit()
    expect(component.label.value).toEqual('new')
    expect(component.color.value.hex).toEqual('000000')
    expect(component.background.value.hex).toEqual('000000')
    expect(component.borderStyle.value).toEqual('dashed')
    expect(component.borderColor.value.hex).toEqual('000000')
  })

})
