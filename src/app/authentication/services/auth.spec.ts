import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {AuthService} from "./auth.service";

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule  ],
      providers: [ AuthService ]
    });

    injector = getTestBed();
    service = injector.inject(AuthService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#login', () => {
    it('should return an auth keys', () => {
      const dummyResponse = {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3LCJleHAiOjE2NzA2MDQyMzd9.5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3fQ.EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
      };

      service.login({
        username: 'Maksym',
        password: '1111'
      }).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne("http://localhost:4000/login");
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
    });
  });

  describe('#register', () => {
    it('should return an auth keys', () => {
      const dummyResponse = {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3LCJleHAiOjE2NzA2MDQyMzd9.5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3fQ.EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
      };

      service.register({
        username: 'NewUser',
        password: '1234Aa'
      }).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne("http://localhost:4000/register");
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
    });
  });

  describe('#templateMap', () => {
    it('Should return saving confirmation', () => {
      const dummyResponse = {
        success: true
      };

      service.saveTemplateMap([],{},'', '').subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne("http://localhost:4000/save_template");
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
    });
  });

  describe('#getUserDataByToken', () => {
    it('Should return user data ', () => {
      const dummyResponse = {};

      service.getUserDataByToken('token').subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne("http://localhost:4000/get_user_data");
      expect(req.request.method).toBe("GET");
      req.flush(dummyResponse);
    });
  });
});
