/*import {FormStylesComponent} from "./form-styles.component";
import {ComponentFixture, TestBed, async, fakeAsync} from "@angular/core/testing";
import {ComponentFixtureAutoDetect} from "@angular/core/testing";
import {Store} from "@ngrx/store";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MAT_COLOR_FORMATS, NgxMatColorPickerModule} from "@angular-material-components/color-picker";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('FormStylesComponent', () => {
  let component:FormStylesComponent
  let fixture: ComponentFixture<FormStylesComponent>
  let store: Store<any>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormStylesComponent],
      imports:[
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMatColorPickerModule,
        MatExpansionModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: () => Promise.resolve({}),
            pipe: () => ({
              label:'Form Label'
            }),
            getState: () => ({
              isLoading: false,
              form:{
                templateMap: [],
                formStyles: {
                  label:'Form Label'
                },
                elementStyles:'',
                token:''
              },
              error: null
            })
          }
        },
        { provide: MAT_COLOR_FORMATS, useValue: {display: { colorInput: 'hex'}} }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStylesComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('some dumb test name', fakeAsync(() => {
    let subscrSpy = spyOn(component.formStylesSelect$, 'subscribe')
  }))
})
*/
