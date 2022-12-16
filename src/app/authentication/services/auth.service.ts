import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {
  }

  checkIfUserExistsAndGetToken(user:any): Observable<any>{
    return this.http.post('http://localhost:4000/login',{
      username: user.username,
      password: user.password
    })
  }

  register(user:any):Observable<any>{
    return this.http.post('http://localhost:4000/register',{
      username: user.username,
      password: user.password
    })
  }

  loginUserToApplication(
    token: string,
    username: string,
    unsubscribeTrigger: Subject<boolean>
  ): boolean{
    this.tokenStorage.saveToken(token)
    this.tokenStorage.saveUser(username)

    unsubscribeTrigger.next(true)
    unsubscribeTrigger.unsubscribe()

    this.router.navigate(['home'])

    return true
  }

  getUserDataByToken(token:any):Observable<any>{
    return this.http.get('http://localhost:4000/get_user_data', {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    })
  }
}
