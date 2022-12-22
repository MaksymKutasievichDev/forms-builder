import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
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
import {first, fromEvent, of} from 'rxjs'
import {FieldStylesComponent} from "./field-styles.component";
import {FormDataMutationService} from "../../services/form-data-mutations.service";
import {TokenStorageService} from "../../../services/token-storage.service";


describe('FieldStylesComponent', () => {
  let component: FieldStylesComponent
  let store: MockStore<any>
  let formDataMutations: FormDataMutationService
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
        FormDataMutationService,
        TokenStorageService,
        HttpClient,
        HttpHandler,
        { provide: MAT_COLOR_FORMATS, useValue: {display: { colorInput: 'hex'}} }
      ]
    }).compileComponents()

    store = TestBed.inject(MockStore)
    http = TestBed.inject(HttpClient)
    formDataMutations = TestBed.inject(FormDataMutationService)
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

  it('should set data from store (empty styles)', fakeAsync(() => {
    const response:any = {
      elementStyles: "",
      templateMap: ['input', 'select']
    }
    spyOn((component as any).store, 'pipe').and.returnValue(of(response))
    fixture = TestBed.createComponent(FieldStylesComponent)
    component = fixture.componentInstance
    // @ts-ignore
    expect(component.formElementsStyles.length).toEqual(0)
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
    spyOn(component, 'deleteElement').and.callFake(() => {
      formTemplateMapSelectorCopy.splice(component.elementIndex,1)
    })
    component.deleteElement()
    expect(formTemplateMapSelectorCopy).toEqual(['input', 'select', 'button'])
  })

  it('should delete element styles from form', () => {
    let formElementStylesCopy = [{label: '1'},{label: '2'},{label: '3'},{label: '4'}];
    component.elementIndex = 2
    spyOn(component, 'deleteElement').and.callFake(() => {
      formElementStylesCopy.splice(component.elementIndex,1)
    })
    component.deleteElement()
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

  it('should open panel', () => {
    component.panelOpenState = false
    component.onPanelOpen()
    expect(component.panelOpenState).toEqual(true)
  })
  it('should close panel', () => {
    component.panelOpenState = true
    component.onPanelClose()
    expect(component.panelOpenState).toEqual(false)
  })

  it('should add class on panel open', () => {
    component.panelOpenState = false
    component.mobileView = true
    component.onPanelOpen()
    // @ts-ignore
    expect(document.querySelector('body').classList.contains('block_scrolling')).toEqual(true)
  })
  it('should remove class on panel close', () => {
    component.panelOpenState = false
    component.mobileView = true
    // @ts-ignore
    document.querySelector('body').classList.add('block_scrolling')
    component.onPanelClose()
    // @ts-ignore
    expect(document.querySelector('body').classList.contains('block_scrolling')).toEqual(false)
  })

  it('should properly set values on init', () => {
    component.ngOnInit()
    expect(component.myForm.value).toEqual({
      title: '',
      label: '',
      placeholder: '',
      width: '',
      height: '',
      fontSize: '',
      fontWeight: '',
      color: '',
      borderColor: '',
      borderStyle: ''
    })
  })

  it('should update values on clicked index change', () => {
    component.elJustDropped = false
    component.formTemplateMapSelector = ['Input']
    component.formElementsStyles = [{}]
    component.elementIndex = 0
    component.ngOnInit()
    component.ngOnChanges({
      elementClickedFlag: {
        currentValue: true,
        firstChange: true,
        previousValue: undefined,
        isFirstChange(): boolean {
          return true
        }
      },
    })
    expect(component.isActive).toBeTruthy()
    expect(component.panelOpenState).toBeTruthy()
  })
  it('should update values on clicked index change (empty element tag)', () => {
    component.elJustDropped = false
    component.formTemplateMapSelector = undefined
    component.formElementsStyles = [{}]
    component.elementIndex = 0
    component.ngOnInit()
    component.ngOnChanges({
      elementClickedFlag: {
        currentValue: true,
        firstChange: true,
        previousValue: undefined,
        isFirstChange(): boolean {
          return true
        }
      },
    })
    expect(component.isActive).toBeTruthy()
    expect(component.panelOpenState).toBeTruthy()
  })

  it('should save fields (innerWidth <= 768)', () => {
    component.ngOnInit()
    component.formElementsStyles = JSON.parse("[{}, {}]")
    component.elementIndex = 0
    spyOn((component as any).store, 'dispatch')
    spyOnProperty(window, 'innerWidth').and.returnValue(500)
    component.saveFieldStyles()
    expect((component as any).store.dispatch).toHaveBeenCalled()
  })
  it('should save fields (innerWidth > 768)', () => {
    component.ngOnInit()
    component.formElementsStyles = JSON.parse("[{}, {}]")
    component.elementIndex = 0
    spyOn((component as any).store, 'dispatch')
    spyOnProperty(window, 'innerWidth').and.returnValue(770)
    component.saveFieldStyles()
    expect((component as any).store.dispatch).toHaveBeenCalled()
  })

  it('should add option', () => {
    spyOn(formDataMutations, 'addOption')
    component.addOption()
    expect(formDataMutations.addOption).toHaveBeenCalled()
  })
  it('should delete option', () => {
    spyOn(formDataMutations, 'removeOption')
    component.removeOption(1)
    expect(formDataMutations.removeOption).toHaveBeenCalled()
  })
  it('should delete element', () => {
    spyOn(formDataMutations, 'deleteElement')
    component.deleteElement()
    expect(formDataMutations.deleteElement).toHaveBeenCalled()
  })

  it('should update mobileView when window is resized', fakeAsync(() => {
    const eventObservable = fromEvent(window, 'resize').pipe(first());
    spyOnProperty(window, 'innerWidth').and.returnValue(475);
    eventObservable.subscribe(() => {
      expect(component.mobileView).toBe(true);
      expect(component.touchUiColorPicket).toBe(true);
      tick()
      discardPeriodicTasks()
    });
    component.ngOnInit()
    window.dispatchEvent(new Event('resize'));
  }));

})
