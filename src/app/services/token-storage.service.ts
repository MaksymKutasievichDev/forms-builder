import {Injectable} from "@angular/core";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const DARK_MODE_STATUS = 'dark-mode-status'

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor() {}

  public getToken():string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }

  public signOut():void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.removeItem(USER_KEY)
  }

  public saveUser(user:any): void {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public getUser(): any{
    return sessionStorage.getItem(USER_KEY)
  }

  public setDarkMode(darkModeStatus:boolean):void{
    sessionStorage.setItem(DARK_MODE_STATUS, `${darkModeStatus}`)
  }
  public getDarkModeStatus():any{
    return sessionStorage.getItem(DARK_MODE_STATUS)
  }
}
