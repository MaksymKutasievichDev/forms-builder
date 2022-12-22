import {FileUploadComponent} from "./file-upload.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Store} from "@ngrx/store";
import {MatIconModule} from "@angular/material/icon";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {forwardRef} from "@angular/core";
import {TemplateComponent} from "../template/template.component";
import {of} from "rxjs";


describe('FileUploadComponent', () => {
  let component: FileUploadComponent
  let fixture: ComponentFixture<FileUploadComponent>

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
        },
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => FileUploadComponent),
        },
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
            } },
          {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => FileUploadComponent),
          },
        ]
      }
    });
    fixture = TestBed.createComponent(FileUploadComponent)
    component = fixture.componentInstance
  })

  it('should be created', () =>{
    component.onChange('name')
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

  it('should trigger click on input', () => {
    let fileUpload = fixture.debugElement.nativeElement.querySelector('#file-upload');
    spyOn(fileUpload, 'click')
    component.onClick(fileUpload)
    expect(fileUpload.click).toHaveBeenCalled()
  })

  it('should set Json data and trigger onChange', () => {
    let fileUpload = fixture.debugElement.nativeElement.querySelector('#file-upload');
    console.log(fileUpload)
    const event = new Event('change');
    spyOn(component, 'onChange')
    spyOn(component, 'fileReaderObs').and.returnValue(of('value'))
    component.fileName = 'file title'
    component.onFileSelected(event)
    expect(component.onChange).toHaveBeenCalledWith('file title')
    // @ts-ignore
    expect(component.JsonData).toEqual('value')
  })

  it('should return Observable that emits the content of file', done => {
    const file = new File([JSON.stringify({test: 'data'})], 'test.json')
    const event = { target: { files: [file] } };
    //spyOnProperty(event, 'target')
    const fileReaderObservable = component.fileReaderObs(event as any)
    fileReaderObservable.subscribe(data => {
      console.log(data)
      expect(data).toEqual({test: 'data'})
      done()
    })

  })
})
