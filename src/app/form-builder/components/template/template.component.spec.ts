import {ComponentFixture, fakeAsync, getTestBed, TestBed, tick} from "@angular/core/testing";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {TemplateComponent} from "./template.component";


describe('TemplateComponent',() => {
  let injector: TestBed
  let component: TemplateComponent
  let fixture: ComponentFixture<TemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TemplateComponent
      ],
      imports: [
        DragDropModule
      ]
    }).compileComponents()
    injector = getTestBed()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should fire getFormElementIndex On Click', fakeAsync(() => {
    component.formTemplateElements = ['Input']
    component.fieldsStyles = [{}]
    fixture.detectChanges()
    spyOn(component, 'getFormElementIndex');
    let button = fixture.debugElement.nativeElement.querySelector('.form_template__element');
    button.click();
    tick()
    expect(component.getFormElementIndex).toHaveBeenCalled();
  }));

  it('should output correct index when on element click', fakeAsync(() => {
    component.formTemplateElements = ['Input']
    component.fieldsStyles = [{}]
    fixture.detectChanges()
    spyOn(component.clickedElementIndex, 'emit');
    let button = fixture.debugElement.nativeElement.querySelector('.form_template__element:first-child');
    button.click();
    tick()
    expect(component.clickedElementIndex.emit).toHaveBeenCalledWith(0)
  }));

  it('should set right window width on init', () => {
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.innerWidth).toEqual(window.innerWidth)
  })

  it('should correctly assign input values', () => {
    component.activeElementIndex = 0;
    component.formTemplateElements = ['element1', 'element2'];
    component.fieldsStyles = [
      {color: 'red' },
      {color: 'blue' }
    ];
    fixture.detectChanges();
    expect(component.activeElementIndex).toEqual(0);
    expect(component.formTemplateElements).toEqual(['element1', 'element2']);
    expect(component.fieldsStyles).toEqual([
      { color: 'red' },
      { color: 'blue' }
    ]);
  });
})
