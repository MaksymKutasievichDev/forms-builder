import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  Color,
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
} from '@angular-material-components/color-picker';
import { MatSelectModule } from '@angular/material/select';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { FormStylesComponent } from './form-styles.component';

describe('FormStylesComponents', () => {
  let component: FormStylesComponent;
  let store: MockStore<any>;
  let fixture: ComponentFixture<FormStylesComponent>;

  const initialState = {
    isLoading: false,
    form: {
      templateMap: [],
      formStyles: {},
      elementStyles: '',
      token: '',
    },
    error: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
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
      ],
      declarations: [FormStylesComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: MAT_COLOR_FORMATS,
          useValue: { display: { colorInput: 'hex' } },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FormStylesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data from store', fakeAsync(() => {
    const response: any = {
      label: 'new',
      color: '#000000',
      background: '#000000',
      borderStyle: 'dashed',
      borderColor: '#000000',
    };
    spyOn((component as any).store, 'pipe').and.returnValue(of(response));
    fixture = TestBed.createComponent(FormStylesComponent);
    component = fixture.componentInstance;
    expect(component.myForm.value).toEqual({
      label: 'new',
      color: new Color(0, 0, 0, 1),
      background: '#000000',
      borderStyle: 'dashed',
      borderColor: new Color(0, 0, 0, 1),
    });
  }));

  it('should update store values', () => {
    const response: any = {
      label: 'new',
      color: '#000000',
      background: '#000000',
      borderStyle: 'dashed',
      borderColor: '#000000',
    };
    store.setState({
      isLoading: false,
      form: {
        templateMap: [],
        formStyles: {
          label: response.label,
          color: response.color,
          background: response.background,
          borderStyle: response.borderStyle,
          borderColor: response.borderColor,
        },
        elementStyles: '',
        token: '',
      },
      error: null,
    });
    spyOn((component as any).store, 'pipe').and.returnValue(of(response));
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FormStylesComponent);
    component = fixture.componentInstance;
    expect(component.myForm.value).toEqual({
      label: 'new',
      color: new Color(0, 0, 0, 1),
      background: '#000000',
      borderStyle: 'dashed',
      borderColor: new Color(0, 0, 0, 1),
    });
  });

  it('should set touch ui if inner width lower then 768px', () => {
    spyOn(component, 'getInnerWidth').and.returnValue(500);
    component.ngOnInit();
    expect(component.touchUi).toEqual(true);
  });

  it('should get window innerWidth', () => {
    expect(component.getInnerWidth()).toEqual(window.innerWidth);
  });

  it('should send data to db', () => {
    spyOn((component as any).store, 'dispatch');
    component.submitFormStyles();
    expect((component as any).store.dispatch).toHaveBeenCalled();
  });
});
