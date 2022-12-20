import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, Subject} from "rxjs";
import {TokenStorageService} from "../../services/token-storage.service";
import {IAllFormData} from "../../interfaces/form-data.interface";
import {UserDataInterface} from "../interfaces/user-data.interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {
  }

  checkIfUserExistsAndGetToken(user:UserDataInterface): Observable<any>{
    return this.http.post(environment.baseUrl + 'login',{
      username: user.username,
      password: user.password
    }).pipe(
      catchError(err => {throw err})
    )
  }

  register(user:UserDataInterface):Observable<any>{
    return this.http.post(environment.baseUrl + 'register',{
      username: user.username,
      password: user.password
    }).pipe(
      catchError(err => {throw err})
    )
  }

  loginUserToApplication(
    token: string,
    username: string,
    unsubscribeTrigger: Subject<boolean>
  ): boolean{
    this.tokenStorageService.saveToken(token)
    this.tokenStorageService.saveUser(username)

    unsubscribeTrigger.next(true)
    unsubscribeTrigger.unsubscribe()

    this.router.navigate(['home'])

    return true
  }

  getUserDataByToken(token:string | null):Observable<any>{
    return this.http.get(environment.baseUrl + 'get_user_data', {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    }).pipe(
      catchError(err => {throw err})
    )
  }

  saveFormToDb(formData:IAllFormData):Observable<any>{
    return this.http.post(environment.baseUrl + 'save_template',{
      templatemap: formData.templateMap,
      formstyles: formData.formStyles,
      elementstyles: formData.elementStyles
    }, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${this.tokenStorageService.getToken()}`
      })
    }).pipe(
      catchError(err => {throw err})
    )
  }
}
