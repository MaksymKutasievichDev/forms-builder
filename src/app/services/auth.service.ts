import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

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
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  register(user:any):Observable<any>{
    return this.http.post('http://localhost:4000/register',{
      username: user.username,
      password: user.password
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  saveTemplateMap(templateMap:string[], formstyles:any, elementstyles:any,token:any):Observable<any>{
    return this.http.post('http://localhost:4000/save_template',{
      templatemap: templateMap,
      formstyles: formstyles,
      elementstyles: elementstyles
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      })
    })
  }

  getUserDataByToken(token:any):Observable<any>{
    return this.http.get('http://localhost:4000/get_user_data', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      })
    })
  }
}
