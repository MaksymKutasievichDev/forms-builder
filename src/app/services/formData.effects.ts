import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EMPTY, mergeMap} from "rxjs";
import {map, catchError} from "rxjs";
import { AuthService } from "./auth.service";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class FormDataEffects {

  loadFormData$ = createEffect(() => this.actions$.pipe(
    ofType('[FormData] Get Form Data'),
    mergeMap(() => this.authService.getUserDataByToken(this.token.getToken())
      .pipe(
        map(data => ({type: '[FormData] Set Form Data after API call', formData: data})),
        catchError(() => EMPTY)
      )
    )
  ))

  constructor(private actions$: Actions, private authService: AuthService, private token: TokenStorageService) {
  }
}
