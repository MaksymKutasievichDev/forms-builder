import {FormDataMutation} from "./form-data-mutations.service";
import {TestBed} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {TokenStorageService} from "../../services/token-storage.service";
import {AppStateInterface} from "../../interfaces/app-state.interface";
import {HttpClient} from "@angular/common/http";


describe('FormDataMutations', () => {
  let service: FormDataMutation
  let http: HttpClient
  let token: TokenStorageService
  let mockStore: MockStore<AppStateInterface>

  beforeEach(() => {
    service = new FormDataMutation(mockStore, http, token)
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
