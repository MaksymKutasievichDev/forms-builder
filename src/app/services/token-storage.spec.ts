import {TestBed} from "@angular/core/testing";
import {TokenStorageService} from "./token-storage.service";


describe('TokenStorageService', () => {
  let service: TokenStorageService;
  beforeEach(() => {
    service = new TokenStorageService()
    TestBed.configureTestingModule({})
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('#getToken should not be empty after token saved', () => {
    service.saveToken('testToken')
    expect(service.getToken()).toBeTruthy()
  })

  it('#SignOut should delete Token', () => {
    service.saveToken('testToken')
    service.signOut()
    expect(service.getToken()).toBeFalsy()
  })

  it('#saveUser should add user data to sessionStorage', () => {
    service.saveUser('newUser')
    expect(service.getUser()).toBeTruthy()
  })
})
