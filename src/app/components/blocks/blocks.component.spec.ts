import {ComponentFixture, getTestBed, TestBed} from "@angular/core/testing";
import {BlocksComponent} from "./blocks.component";


describe('BlocksComponent',() => {
  let injector: TestBed
  let component: BlocksComponent
  let fixture: ComponentFixture<BlocksComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BlocksComponent
      ],
    }).compileComponents()
    injector = getTestBed()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
