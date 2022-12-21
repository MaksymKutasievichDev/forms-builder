import {hexToRgb} from "./helpers";

describe('hexToRgb', () => {
  it('should convert a hex to ad rgb object', () => {
    const hex = '#ff00ff'
    const expectedRgb = {r: 255, g: 0, b: 255}
    const result = hexToRgb(hex)
    expect(result).toEqual(
      expectedRgb
    )
  })
  it('should be null if hex is invalid', () => {
    const hex = 'asdasdasd';
    const result = hexToRgb(hex)
    expect(result).toEqual(null)
  })
  it('should return null if type is not string', () => {
    const hex = undefined
    const result = hexToRgb(hex)
    expect(result).toEqual(
      null
    )
  })
})
