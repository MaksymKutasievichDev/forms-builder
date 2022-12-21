import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {AuthService} from "./auth.service";
import {environment} from "../../../environments/environment";

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

  describe('#checkIfUserExists', () => {
    it('should return an auth keys', () => {
      const dummyResponse = {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3LCJleHAiOjE2NzA2MDQyMzd9.5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3fQ.EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
      };

      service.checkIfUserExistsAndGetToken({
        username: 'Maksym',
        password: '1111'
      }).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });
      const req = httpMock.expectOne(environment.baseUrl + "login");
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
    });
    it('should throw error', () => {
      const dummyResponse = {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3LCJleHAiOjE2NzA2MDQyMzd9.5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3fQ.EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
      };
      let errResponse: any;
      service.checkIfUserExistsAndGetToken({
        username: 'Maksym',
        password: '1111'
      }).subscribe({
        next: data => {
          expect(data).toEqual(dummyResponse);
        },
        error: err => {
          errResponse = err
        }
      });
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const req = httpMock.expectOne(environment.baseUrl + "login");
      req.flush(dummyResponse,mockErrorResponse);
      expect(errResponse.status).toEqual(400);
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

      const req = httpMock.expectOne(environment.baseUrl + "register");
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
    });
    it('should throw error', () => {
      const dummyResponse = {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3LCJleHAiOjE2NzA2MDQyMzd9.5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3fQ.EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
      };
      let errResponse: any;
      service.register({
        username: 'NewUser',
        password: '1234Aa'
      }).subscribe({
        next: data => {
          expect(data).toEqual(dummyResponse);
        },
        error: err => {
          errResponse = err
        }
      });
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const req = httpMock.expectOne(environment.baseUrl + "register");
      req.flush(dummyResponse,mockErrorResponse);
      expect(errResponse.status).toEqual(400);
    });
  });

  describe('#getUserDataByToken', () => {
    it('Should return user data ', () => {
      const dummyResponse = {};

      service.getUserDataByToken('token').subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(environment.baseUrl + "get_user_data");
      expect(req.request.method).toBe("GET");
      req.flush(dummyResponse);
    });
    it('should throw error ', () => {
      const dummyResponse = {};
      let errResponse: any;
      service.getUserDataByToken('token').subscribe({
        next: data => {
          expect(data).toEqual(dummyResponse);
        },
        error: err => {
          errResponse = err
        }
      });
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const req = httpMock.expectOne(environment.baseUrl + "get_user_data");
      req.flush(dummyResponse,mockErrorResponse);
      expect(errResponse.status).toEqual(400);
    });
  });

  describe('#saveFormtoDb', () => {
    it('should save data to db', () => {
      const dummyResponse = {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3LCJleHAiOjE2NzA2MDQyMzd9.5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3fQ.EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
      };

      service.saveFormToDb({
        templateMap: [],
        formStyles: {},
        elementStyles: '',
        token:''
      }).subscribe(data => {
        expect(data).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(environment.baseUrl + "save_template");
      expect(req.request.method).toBe("POST");
      req.flush(dummyResponse);
    });
    it('should save data to db', () => {
      const dummyResponse = {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3LCJleHAiOjE2NzA2MDQyMzd9.5aCtL3AtnBpy50j6JqRt-QvmxlGMyBGj1frhxChmndM",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFrc3ltIiwicGFzc3dvcmQiOiIxMTExIiwiaWF0IjoxNjcwNjAwNjM3fQ.EafL_8ZRNKlB5lK4U-d9CIY-Z13ViGCRtYpY7QS5jwI"
      };
      let errResponse: any;
      service.saveFormToDb({
        templateMap: [],
        formStyles: {},
        elementStyles: '',
        token:''
      }).subscribe({
        next: data => {
          expect(data).toEqual(dummyResponse);
        },
        error: err => {
          errResponse = err
        }
      });
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const req = httpMock.expectOne(environment.baseUrl + "save_template");
      req.flush(dummyResponse,mockErrorResponse);
      expect(errResponse.status).toEqual(400);
    });
  });
});

