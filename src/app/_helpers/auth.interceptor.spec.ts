import {AuthInspector} from "./auth.interceptor";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {TestBed, fakeAsync} from "@angular/core/testing";
import {of} from "rxjs";

describe('AuthInterceptor', () => {
  let authInterceptor: AuthInspector
  let next: HttpHandler

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AuthInspector,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInspector,
          multi: true
        }
      ]
    });
    authInterceptor = TestBed.inject(AuthInspector)
    next = {
      handle: (req: HttpRequest<any>) => of({})
    } as HttpHandler
  })

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should set the content type header to application/json', fakeAsync(() => {
    const req = new HttpRequest('GET', '/test');
    const result = authInterceptor.intercept(req, next);
    result.subscribe((res: HttpEvent<any>) => {
      if(res instanceof HttpResponse){
        expect(res.headers.get('Content-type')).toEqual('application/json')
      }
    });
  }));
})
