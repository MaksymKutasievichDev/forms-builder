import {RemoveQuotationMarksPipe} from "./remove-quotation-marks.pipe";

describe('RemoveQuotationMarksPipe', () => {
  const pipe = new RemoveQuotationMarksPipe()

  it('should remove quotation marks', () => {
    expect(pipe.transform('"sometext"')).toBe('sometext')
  })
})
