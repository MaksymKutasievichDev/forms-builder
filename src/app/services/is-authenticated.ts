import {Injectable} from "@angular/core";
import {CanActivate, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.tokenStorageService.getToken() || this.tokenStorageService.getToken() == "undefined" ){
      this.router.navigate(['auth/checkIfUserExists'])
    }
    return true
  }
}
