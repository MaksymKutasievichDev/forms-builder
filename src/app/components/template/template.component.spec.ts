import {ComponentFixture, getTestBed, TestBed} from "@angular/core/testing";
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

  it('should output correct index when on element click', () => {
    spyOn(component.clickedElementIndex, 'emit');
    component.getFormElementIndex({ target: { dataset: { index: 2 } } });
    expect(component.clickedElementIndex.emit).toHaveBeenCalledWith(2);
  });

  it('should correctly assign input values', () => {
    component.activeElementIndex = 0;
    component.formTemplateElements = ['element1', 'element2'];
    component.fieldsStyles = {
      element1: { color: 'red' },
      element2: { color: 'blue' }
    };
    fixture.detectChanges();
    expect(component.activeElementIndex).toEqual(0);
    expect(component.formTemplateElements).toEqual(['element1', 'element2']);
    expect(component.fieldsStyles).toEqual({
      element1: { color: 'red' },
      element2: { color: 'blue' }
    });
  });
})
