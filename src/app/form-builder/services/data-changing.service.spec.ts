import {DataChangingService} from "./data-changing.service";


describe('Data changing', () => {
  let service: DataChangingService
  beforeEach(() => {
    service = new DataChangingService()
  })

  it('should properly change data before fields updating', () => {
    let initialValue = {
      width: '24px',
      height: '24px',
      fontSize: '24px',
    }
    initialValue = service.changeDataBeforeFieldsUpdate(initialValue)
    expect(initialValue).toEqual({
      width: '24',
      height: '24',
      fontSize: '24'
    })
  })

  it('should properly change data before save to db', () => {
    let initialValue = {
      width: '24',
      height: '24',
      fontSize: '24',
      color: {
        hex: '000000'
      },
      borderColor: {
        hex: '000000'
      },
      background: {
        hex: '000000'
      }
    }
    let newValue = service.changeFieldsDataBeforeSave(initialValue)
    expect(newValue).toEqual({
      width: '24px',
      height: '24px',
      fontSize: '24px',
      color: '#000000',
      borderColor: '#000000',
      background: '#000000'
    })
  })
})
