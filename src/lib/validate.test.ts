import { Duration, YearWithSemesterDuration } from '/@/lib/apis'
import {
  isValidDuration,
  isValidLength,
  isValidOptionalUrl,
  isValidUrl,
  isValidYearWithSemesterDuration
} from '/@/lib/validate'

describe('validator', () => {
  describe('isValidLength', () => {
    test('文字列の長さが指定した範囲に収まっているときにtrueが返る', () => {
      const string = 'oisu-oisu-oisu-oisu-'
      expect(isValidLength(string, 1, 20)).toBe(true)
    })
    test('文字列の長さが指定した範囲に収まっていないときにfalseが返る', () => {
      const string = 'oisu-oisu-oisu-oisu-oisu-oisu-oisu-'
      expect(isValidLength(string, 1, 20)).toBe(false)
    })
  })
  describe('isValidUrl', () => {
    test('正常なURLのときにtrueが返る', () => {
      const url = 'https://trap.jp'
      expect(isValidUrl(url)).toBe(true)
    })
    test('URLがjavascript:から始まるときにfalseが返る', () => {
      const url = 'javascript:alert("oisu-")'
      expect(isValidUrl(url)).toBe(false)
    })
  })
  describe('isValidOptionalUrl', () => {
    test('正常なURLのときにtrueが返る', () => {
      const url = 'https://trap.jp'
      expect(isValidOptionalUrl(url)).toBe(true)
    })
    test('URLが空文字のときにtrueが返る', () => {
      const url = ''
      expect(isValidOptionalUrl(url)).toBe(true)
    })
  })
  describe('isValidDuration', () => {
    test('sinceがuntil以前のときにtrueが返る', () => {
      const duration: Duration = {
        since: '2023-12-23',
        until: '2024-01-02'
      }
      expect(isValidDuration(duration)).toBe(true)
    })
    test('sinceがuntilより後のときにfalseが返る', () => {
      const duration: Duration = {
        since: '2024-01-02',
        until: '2023-12-23'
      }
      expect(isValidDuration(duration)).toBe(false)
    })
  })
  describe('isValidYearWithSemesterDuration', () => {
    test('sinceがuntil以前のときにtrueが返る', () => {
      const duration: YearWithSemesterDuration = {
        since: {
          year: 2023,
          semester: 1
        },
        until: {
          year: 2024,
          semester: 0
        }
      }
      expect(isValidYearWithSemesterDuration(duration)).toBe(true)
    })
    test('yearがsinceの方が後のときにfalseが返る', () => {
      const duration: YearWithSemesterDuration = {
        since: {
          year: 2024,
          semester: 0
        },
        until: {
          year: 2023,
          semester: 1
        }
      }
      expect(isValidYearWithSemesterDuration(duration)).toBe(false)
    })
    test('yearが等しくてsemesterがsinceの方が後のときにfalseが返る', () => {
      const duration: YearWithSemesterDuration = {
        since: {
          year: 2023,
          semester: 1
        },
        until: {
          year: 2023,
          semester: 0
        }
      }
      expect(isValidYearWithSemesterDuration(duration)).toBe(false)
    })
    test('untilがundefinedのときにtrueが返る', () => {
      const duration: YearWithSemesterDuration = {
        since: {
          year: 2023,
          semester: 1
        }
      }
      expect(isValidYearWithSemesterDuration(duration)).toBe(true)
    })
  })
})
