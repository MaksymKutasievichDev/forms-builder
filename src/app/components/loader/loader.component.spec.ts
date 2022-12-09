import {ComponentFixture, getTestBed, TestBed} from "@angular/core/testing";
import {LoaderComponent} from "./loader.component";


describe('LoaderComponent',() => {
  let injector: TestBed
  let component: LoaderComponent
  let fixture: ComponentFixture<LoaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoaderComponent
      ],
    }).compileComponents()
    injector = getTestBed()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
