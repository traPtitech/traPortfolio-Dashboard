import { isValidLength } from '/@/lib/validate'

describe('validator', () => {
  describe('isValidLength', () => {
    test('12文字の文字列が1から20の長さに収まっていると判定できる', () => {
      const value = 'oisu-oisu-oisu-'
      expect(isValidLength(value, 1, 20)).toBe(true)
    })
    test('32文字の文字列が1から20の長さに収まっていないと判定できる', () => {
      const value = 'oisu-oisu-oisu-oisu-oisu-oisu-oisu-oisu-'
      expect(isValidLength(value, 1, 20)).toBe(false)
    })
  })
})
