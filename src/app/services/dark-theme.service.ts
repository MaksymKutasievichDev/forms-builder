import {Injectable} from "@angular/core";

const DARK_MODE_STATUS = 'dark-mode-status'

@Injectable({
  providedIn: 'root'
})

export class DarkThemeService {
  constructor() {}

  public getStatus() {
    return sessionStorage.getItem(DARK_MODE_STATUS)
  }

  public setStatus(darkThemeStatus: boolean | null) {
    sessionStorage.setItem(DARK_MODE_STATUS, `${darkThemeStatus}`)
  }
}
