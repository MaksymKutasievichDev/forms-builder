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
})
