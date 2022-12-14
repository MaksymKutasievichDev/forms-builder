import {FormDataMutation} from "./form-data-mutations.service";
import {TestBed} from "@angular/core/testing";
import {provideMockStore} from "@ngrx/store/testing";
import {TokenStorageService} from "../../services/token-storage.service";
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../interfaces/app-state.interface";
import {HttpClient} from "@angular/common/http";


describe('FormDataMutations', () => {
  let service: FormDataMutation
  let http: HttpClient
  let token: TokenStorageService
  let store: Store<AppStateInterface>

  beforeEach(() => {
    service = new FormDataMutation(store, http, token)
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({})
      ]
    })

    store = TestBed.inject(Store<AppStateInterface>)
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

  it('should delete element', () => {
    let initMap = ['Input','Checkbox','Select']
    let initStyles = [{}, {}, {}]
    let elIndex = 1
    spyOn((service as any).store, 'dispatch').and.callFake(() => {
      initMap.splice(elIndex,1)
      initStyles.splice(elIndex, 1)
    })
    service.deleteElement(initMap, initStyles, elIndex)
    expect(initMap).toEqual(['Input'])
    expect(initStyles).toEqual([{}])
  })

})
