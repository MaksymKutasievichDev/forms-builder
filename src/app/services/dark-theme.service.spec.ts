import {DarkThemeService} from "./dark-theme.service";


describe('DarkThemeService', () => {
  const DARK_MODE_STATUS = 'dark-mode-status'
  let darkThemeService: DarkThemeService

  beforeEach(() => {
    darkThemeService = new DarkThemeService()
  })

  it('Should set dark mode to true', () => {
    darkThemeService.setStatus(true)
    expect(sessionStorage.getItem(DARK_MODE_STATUS)).toEqual('true')
  })

  it('Should set dark mode to false', () => {
    darkThemeService.setStatus(false)
    expect(sessionStorage.getItem(DARK_MODE_STATUS)).toEqual('false')
  })

  it('Should get darkMode status', () => {
    darkThemeService.setStatus(false)
    expect(darkThemeService.getStatus()).toEqual('false')
    darkThemeService.setStatus(true)
    expect(darkThemeService.getStatus()).toEqual('true')
  })
})
