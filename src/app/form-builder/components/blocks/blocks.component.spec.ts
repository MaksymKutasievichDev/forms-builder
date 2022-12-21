import {ComponentFixture, getTestBed, TestBed} from "@angular/core/testing";
import {BlocksComponent} from "./blocks.component";
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "@angular/cdk/drag-drop";


describe('BlocksComponent',() => {
  let injector: TestBed
  let component: BlocksComponent
  let fixture: ComponentFixture<BlocksComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BlocksComponent
      ],
      imports:[
        MatIconModule,
        DragDropModule
      ]
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

  it('should change open small status', () => {
    component.changeOpenOnSmallScreenStatus()
    expect(component.openedOnSmallScreen).toEqual(true)
  })
})
