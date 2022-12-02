import {HTTP_INTERCEPTORS, HttpEvent} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpHandler, HttpRequest} from "@angular/common/http";

import {Observable} from "rxjs";

@Injectable()
export class  AuthInspector implements HttpInterceptor {
  constructor() {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = req.clone({
      headers: req.headers.set("Content-Type", 'application/json')
    })
    return next.handle(cloned)
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInspector, multi: true}
]
