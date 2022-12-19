import {Injectable} from "@angular/core";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

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

  public getUser(): string | null {
    return sessionStorage.getItem(USER_KEY)
  }
  public saveUser(user: string): void {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public signOut():void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.removeItem(USER_KEY)
  }

}
