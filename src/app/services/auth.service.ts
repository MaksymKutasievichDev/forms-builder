import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAllFormData} from "./IFieldsStyles";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user:any): Observable<any>{
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

  saveTemplateMap(templateMap: string[] | undefined, formStyles: {}, elementStyles: string, token: string | null):Observable<any>{
    return this.http.post('http://localhost:4000/save_template',{
      templatemap: templateMap,
      formstyles: formStyles,
      elementstyles: elementStyles
    }, {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    })
  }

  getUserDataByToken(token:any):Observable<any>{
    return this.http.get('http://localhost:4000/get_user_data', {
      headers: new HttpHeaders({
        'authorization': `Bearer ${token}`
      })
    })
  }
}
