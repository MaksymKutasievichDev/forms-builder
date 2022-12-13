import {FileUploadComponent} from "./file-upload.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Store} from "@ngrx/store";
import {MatIconModule} from "@angular/material/icon";


describe('FileUploadComponent', () => {
  let component: FileUploadComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileUploadComponent
      ],
      imports: [
        HttpClientTestingModule,
        MatIconModule
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: () => Promise.resolve({}),
            getState: () => ({
              isLoading: false,
              form:{
                templateMap: [],
                formStyles: {},
                elementStyles:'',
                token:''
              },
              error: null
            })
          }
        }
      ]
    })
    TestBed.overrideComponent(FileUploadComponent, {
      set: {
        providers: [
          { provide: Store, useValue: {
              dispatch: () => Promise.resolve({}),
              getState: () => ({
                isLoading: false,
                form: component.JsonData,
                error: null
              })
            } }
        ]
      }
    });
    component = TestBed.createComponent(FileUploadComponent).componentInstance
  })

  it('should be created', () =>{
    expect(component).toBeTruthy()
  })

  it('should change file name', () => {
    component.writeValue('NewFileName')
    expect(component.fileName).toEqual('NewFileName')
  })

  it('should set disabled status to true', () => {
    component.setDisabledState(true)
    expect(component.disabled).toEqual(true)
  })

  it('should set onTouched to arg value', () => {
    component.registerOnTouched(true)
    expect(component.onTouched).toEqual(true)
  })

  it('should set onChange to arg value', () => {
    component.registerOnChange(true)
    expect(component.onChange).toEqual(true)
  })

  it('should set new values to the store', () => {
    component.JsonData = {
      templateMap:[
        "Input",
        "Input",
        "Checkbox",
        "Input",
        "Button"
      ],
      formStyles:{},
      elementStyles:'',
      token:"token"
    }
    component.setDataFromJson()
    expect((component as any).store.getState()).toEqual({
      isLoading: false,
      form: {
        templateMap:[
          "Input",
          "Input",
          "Checkbox",
          "Input",
          "Button"
        ],
        formStyles:{},
        elementStyles:'',
        token:'token'
      },
      error: null
    })
  })
})
