import {Router} from "@angular/router"
import {IsAuthenticatedGuard} from "./is-authenticated";
import {TokenStorageService} from "./token-storage.service";


describe('IsAuthenticatedGuard', () => {
  let guard: IsAuthenticatedGuard
  let tokenStorageService: TokenStorageService
  let router: Router

  beforeEach(() => {
    tokenStorageService = new TokenStorageService()
    router = jasmine.createSpyObj('Router',['navigate'])
    guard = new IsAuthenticatedGuard(tokenStorageService, router)
  })

  it('should return true if the storage has valid token', () => {
    tokenStorageService.saveToken('testToken')
    // @ts-ignore
    expect(guard.canActivate('home', '')).toBe(true)
  })

  it('should navigate to the login page when the token storage service does not have a valid token', () => {
    tokenStorageService.signOut();
    // @ts-ignore
    guard.canActivate('home', '');
    expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
  });
})
