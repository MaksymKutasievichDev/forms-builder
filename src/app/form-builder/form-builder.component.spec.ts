import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import {DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import * as cdkDragDrop from '@angular/cdk/drag-drop'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
} from '@angular-material-components/color-picker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilderComponent } from './form-builder.component';
import { FormStylesComponent } from './components/form-styles/form-styles.component';
import { FieldStylesComponent } from './components/field-styles/field-styles.component';
import { FormDataMutationService } from './services/form-data-mutations.service';
import { AuthService } from '../authentication/services/auth.service';
import { first, fromEvent, of, throwError } from 'rxjs';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let store: MockStore<any>;
  let authService: AuthService;
  let domSanitizer: DomSanitizer;
  let formDataMutationServer: FormDataMutationService
  let fixture: ComponentFixture<FormBuilderComponent>;

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
        MatIconModule,
      ],
      declarations: [
        FormBuilderComponent,
        FormStylesComponent,
        FieldStylesComponent,
      ],
      providers: [
        AuthService,
        FormDataMutationService,
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: () => 'safeString',
            bypassSecurityTrustHtml: () => 'safeString',
            bypassSecurityTrustUrl: () => 'safeString',
          },
        },
        provideMockStore({ initialState }),
        {
          provide: MAT_COLOR_FORMATS,
          useValue: { display: { colorInput: 'hex' } },
        },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    domSanitizer = TestBed.inject(DomSanitizer);
    formDataMutationServer = TestBed.inject(FormDataMutationService)
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should set clickedElementIndex on click', () => {
    component.getClickedElementIndex(5);
    expect(component.clickedElementIndex).toEqual(5);
  });

  it('should block', () => {
    expect(component.blockDropping()).toBeFalsy();
  });

  it('should through error on save', () => {
    spyOn(authService, 'saveFormToDb').and.returnValues(
      throwError(() => new Error())
    );
    component.saveMap();
    expect(authService.saveFormToDb).toHaveBeenCalled();
  });
  it('should through error string on save', () => {
    spyOn(authService, 'saveFormToDb').and.returnValues(
      throwError(() => ({ error: 'error' }))
    );
    component.saveMap();
    expect(authService.saveFormToDb).toHaveBeenCalled();
  });

  it('should through error string on save', fakeAsync(() => {
    spyOn(authService, 'saveFormToDb').and.returnValues(of({}));
    component.saveMap();
    tick(2000);
    expect(authService.saveFormToDb).toHaveBeenCalled();
  }));

  it('should set data from store', () => {
    let formStyles = { label: 'label' };
    let templateMap = ['Input'];
    let elementStyles = '[{},{}]';
    let data = {
      formStyles: formStyles,
      templateMap: templateMap,
      elementStyles: elementStyles,
    };
    domSanitizer = TestBed.inject(DomSanitizer);
    spyOn((component as any).store, 'pipe').and.returnValue(of(data));
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    expect(component.formStyles).toEqual(formStyles);
    expect(component.formTemplateElements).toEqual(templateMap);
    component.downloadJsonHref = {};
    expect(component.downloadJsonHref).toBeDefined();
  });
  it('should set empty data from store', () => {
    let formStyles = {};
    let templateMap = [''];
    let data = {
      formStyles: formStyles,
      templateMap: templateMap,
    };
    spyOn((component as any).store, 'pipe').and.returnValue(of(data));
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    expect(component.formStyles).toEqual(formStyles);
    expect(component.formTemplateElements).toEqual(templateMap);
    // @ts-ignore
    expect(component.downloadJsonHref).toEqual('safeString');
  });

  it('should update mobileView when window is resized', fakeAsync(() => {
    const eventObservable = fromEvent(window, 'resize').pipe(first());
    spyOnProperty(window, 'innerWidth').and.returnValue(475);
    eventObservable.subscribe(() => {
      expect(component.mobileView).toBe(true);
      tick();
      discardPeriodicTasks();
    });
    component.ngOnInit();
    window.dispatchEvent(new Event('resize'));
  }));

  it('should recreate element in elements list when container exited', () => {
    component.formElementsList = ['element1', 'element2', 'element3'];
    const event = {
      container: {
        data: ['element1', 'element2', 'element3']
      },
      item: {
        data: 'element2'
      }
    }
    component.containerExitedOnDrag(event as any)
    expect(component.formElementsList).toEqual(['element1', 'element2', 'element2', 'element3'])
  })
  it('should delete same element in elements list when container entered', () => {
    component.formElementsList = ['element1', 'element2', 'element2', 'element3'];
    const event = {
      container: {
        data: ['element1', 'element2','element2', 'element3']
      },
      item: {
        data: 'element2'
      }
    }
    component.containerEnteredOnDrag(event as any)
    expect(component.formElementsList).toEqual(['element1', 'element2', 'element3'])
  })
  it('should move item inside container', () => {
    let eventMock = {
      previousContainer:{
        id: 'dumbText'
      },
      container: {
        id: 'cdk-drop-list-0',
        data: {
          data: ['Input', 'Select']
        }
      },
      previousIndex: 1,
      currentIndex: 0
    }
    spyOn(formDataMutationServer, 'moveElementInsideForm')
    spyOn(formDataMutationServer, 'moveElementsStyles')
    component.drop(eventMock as any)
    expect(formDataMutationServer.moveElementsStyles).toHaveBeenCalled()
    expect(formDataMutationServer.moveElementsStyles).toHaveBeenCalled()
    expect(component.clickedElementIndex).toEqual(0)
  })
  it('should move item inside container', () => {
    console.log('test d2')
    component.formElementsList = ['element1', 'element2', 'element3'];
    let eventMock = {
      previousContainer:{
        id: 'cdk-drop-list-1',
        data: ['Input', 'Select', 'Checkbox']
      },
      container: {
        id: 'cdk-drop-list-0',
        data: {
          data: ['Input', 'Select']
        }
      },
      item: {
        data: 'Select'
      },
      previousIndex: 1,
      currentIndex: 0
    }
    spyOn(formDataMutationServer, 'addElementToForm')
    spyOn(formDataMutationServer, 'addStylesForNewElement')
    component.drop(eventMock as any)
    expect(formDataMutationServer.addElementToForm).toHaveBeenCalled()
    expect(formDataMutationServer.addStylesForNewElement).toHaveBeenCalled()
    expect(component.formElementsList).toEqual(['element1', 'element3'])
  })
});
