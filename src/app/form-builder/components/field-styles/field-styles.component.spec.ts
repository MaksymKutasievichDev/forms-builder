import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ComponentFixture, fakeAsync, TestBed} from "@angular/core/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MAT_COLOR_FORMATS, NgxMatColorPickerModule} from "@angular-material-components/color-picker";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {of} from 'rxjs'
import {FieldStylesComponent} from "./field-styles.component";
import {FormDataMutation} from "../../services/form-data-mutations.service";
import {TokenStorageService} from "../../../services/token-storage.service";


describe('FieldStylesComponent', () => {
  let component: FieldStylesComponent
  let store: MockStore<any>
  let formDataMutations: FormDataMutation
  let fixture: ComponentFixture<FieldStylesComponent>
  let http: HttpClient

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
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        DragDropModule,
        ReactiveFormsModule,
        NgxMatColorPickerModule,
        MatSelectModule,
        MatIconModule
      ],
      declarations:[
        FieldStylesComponent
      ],
      providers: [
        provideMockStore({initialState}),
        FormDataMutation,
        TokenStorageService,
        HttpClient,
        HttpHandler,
        { provide: MAT_COLOR_FORMATS, useValue: {display: { colorInput: 'hex'}} }
      ]
    }).compileComponents()

    store = TestBed.inject(MockStore)
    http = TestBed.inject(HttpClient)
    formDataMutations = TestBed.inject(FormDataMutation)
    fixture = TestBed.createComponent(FieldStylesComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set data from store', fakeAsync(() => {
    const response:any = {
      elementStyles: "[{},{},{},{},{}]",
      templateMap: ['input', 'select']
    }
    spyOn((component as any).store, 'pipe').and.returnValue(of(response))
    fixture = TestBed.createComponent(FieldStylesComponent)
    component = fixture.componentInstance
    // @ts-ignore
    expect(component.formElementsStyles.length).toEqual(5)
    expect(component.formTemplateMapSelector).toEqual(['input', 'select'])
  }));

  it('should close the modal', () => {
    component.panelOpenState = true;
    component.closeModal()
    expect(component.panelOpenState).toEqual(false)
  })

  it('should delete element from form', () => {
    component.formTemplateMapSelector = ['input', 'select', 'checkbox', 'button']
    let formTemplateMapSelectorCopy = JSON.parse(JSON.stringify(component.formTemplateMapSelector));
    component.elementIndex = 2
    spyOn(component, 'sendDeleteCall').and.callFake(() => {
      formTemplateMapSelectorCopy.splice(component.elementIndex,1)
    })
    component.sendDeleteCall()
    expect(formTemplateMapSelectorCopy).toEqual(['input', 'select', 'button'])
  })

  it('should delete element styles from form', () => {
    let formElementStylesCopy = [{label: '1'},{label: '2'},{label: '3'},{label: '4'}];
    component.elementIndex = 2
    spyOn(component, 'sendDeleteCall').and.callFake(() => {
      formElementStylesCopy.splice(component.elementIndex,1)
    })
    component.sendDeleteCall()
    expect(formElementStylesCopy).toEqual([{label: '1'},{label: '2'},{label: '4'}])
  })

  it('should add option to select', () => {
    let formElementStylesCopy = [{label: '1', options: ['option1']},{label: '2', options: ['option1']},{label: '3', options: ['option1']},{label: '4', options: ['option1']}];
    component.elementIndex = 2
    spyOn(component, 'addOption').and.callFake(() => {
      formElementStylesCopy[component.elementIndex].options.push('option2')
    })
    component.addOption()
    expect(formElementStylesCopy).toEqual([{label: '1', options: ['option1']},{label: '2', options: ['option1']},{label: '3', options: ['option1', 'option2']},{label: '4', options: ['option1']}])
  })

  it('should remove option in select', () => {
    let formElementStylesCopy = [{label: '1', options: ['option1']},{label: '2', options: ['option1']},{label: '3', options: ['option1']},{label: '4', options: ['option1']}];
    component.elementIndex = 2
    let index = 0
    spyOn(component, 'addOption').and.callFake(() => {
      formElementStylesCopy[component.elementIndex].options.splice(index, 1)
    })
    component.addOption()
    expect(formElementStylesCopy).toEqual([{label: '1', options: ['option1']},{label: '2', options: ['option1']},{label: '3', options: []},{label: '4', options: ['option1']}])
  })
})
