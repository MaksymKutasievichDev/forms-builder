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
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  /*it('should add Element', () => {
    let initialArr = ['Input','Select']
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      initialArr.splice(1, 0, 'Checkbox')
    })
    service.addElementToForm(initialArr, 1, 'Checkbox')
    expect(initialArr).toEqual(['Input','Checkbox','Select'])
  })*/

  /*it('should delete element', () => {
    const initialState = {
      formState: {
        isLoading: false,
        form: {
          templateMap: [],
          formStyles: {},
          elementStyles: '',
          token: ''
        },
        error: null
      }
    }
    mockStore.setState(initialState)
    let initMap = ['Input','Checkbox','Select']
    let initStyles = [{}, {}, {}]
    let elIndex = 1
    initMap.splice(elIndex,1)
    mockStore.dispatch(updateElementsStyles({elementsStyles: JSON.stringify(initMap)}))

    expect(initMap).toEqual(['Input'])
    expect(initStyles).toEqual([{}])
  })*/

})
