import {array_move, hexToRgb} from "./helpers";

describe('array_move', () => {
  it('should move an item from one index to another', () => {
    const arr = [1, 2, 3, 4];
    const result = array_move(arr, 0, 2);
    expect(result).toEqual([2, 3, 1, 4]);
  });

  it('should handle moving an item to an index greater than the length of the array', () => {
    const arr = [1, 2, 3, 4];
    const result = array_move(arr, 0, 10);
    expect(result).toEqual([2, 3, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1]);
  });
});

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
})
