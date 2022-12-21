import {FormDataMutationService} from "./form-data-mutations.service";
import {TestBed} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {AppStateInterface} from "../../interfaces/app-state.interface";


describe('FormDataMutations', () => {
  let service: FormDataMutationService
  let mockStore: MockStore<AppStateInterface>

  beforeEach(() => {
    service = new FormDataMutationService(mockStore)
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
        })
      ]
    })

    mockStore = TestBed.inject(MockStore<AppStateInterface>)
    service = new FormDataMutationService(mockStore)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should add Element', () => {
    let initialArr = ['Input','Select']
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      initialArr.splice(1, 0, 'Checkbox')
    })
    service.addElementToForm(initialArr, 1, 'Checkbox')
    expect(initialArr).toEqual(['Input','Checkbox','Select'])
  })

  it('should add styles with options for new Select', () => {
    let initialStyles = [{}, {}, {}]
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      if("Select"=="Select"){
        initialStyles.splice(3, 0, {options:['option1', 'option2']})
      } else {
        initialStyles.splice(3, 0, {})
      }
    })
    service.addStylesForNewElement(initialStyles, 'Select', 3)
    expect(initialStyles).toEqual([{}, {}, {}, {options:['option1', 'option2']}])
  })

  it('should add empty styles for new element', () => {
    let initialStyles = [{}, {}, {}]
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      let elementTag = "Input"
      if(elementTag=="Select"){
        initialStyles.splice(3, 0, {options:['option1', 'option2']})
      } else {
        initialStyles.splice(3, 0, {})
      }
    })
    service.addStylesForNewElement(initialStyles, 'Input', 3)
    expect(initialStyles).toEqual([{}, {}, {}, {}])
  })

  it('should move element inside form',() => {
    let newFormMap = ['Input', 'Select', 'Checkbox'];
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      newFormMap.splice(2, 1)
      newFormMap.splice(0, 0, 'Checkbox')
    })
    service.moveElementInsideForm(newFormMap, 2, 0, 'Checkbox')
    expect(newFormMap).toEqual(['Checkbox', 'Input', 'Select'])
  })

  it('should move element inside form',() => {
    let newFormElementsStyles = [{}, {}, {label: 'label'}];
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      let dataForMove = newFormElementsStyles[2]
      newFormElementsStyles.splice(2, 1)
      newFormElementsStyles.splice(0, 0, dataForMove)
    })
    service.moveElementsStyles(newFormElementsStyles, 2, 0)
    expect(newFormElementsStyles).toEqual([{label: 'label'}, {}, {}])
  })

  it('should add option', () => {
    let initialValue = [{},{},{options: ['option1']}]
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      // @ts-ignore
      initialValue[2].options.push('option2')
    })
    service.addOption(initialValue, 2, 'option2')
    expect(initialValue).toEqual([{},{},{options: ['option1', 'option2']}])
  })

  it('should remove option', () => {
    let initialValue = [{},{},{options: ['option1', 'option2']}]
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      // @ts-ignore
      initialValue[2].options.splice(1,1)
    })
    service.removeOption(initialValue, 1, 2)
    expect(initialValue).toEqual([{},{},{options: ['option1']}])
  })

  it('should delete element and styles', () => {
    let initialElements = ['Input','Select']
    let initialStyles = [{label: 'label1'}, {label: 'label2'}]
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      initialElements.splice(1,1)
      initialStyles.splice(1, 1)
    })
    service.deleteElement(initialElements, initialStyles, 1)
    expect(initialElements).toEqual(['Input'])
    expect(initialStyles).toEqual([{label: 'label1'}])
  })
})
