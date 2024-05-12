// https://github.com/traPtitech/traQ_S-UI/blob/983c6f89f3246509011f8ca4d76e2ba24e0beb2b/src/lib/basic/array.ts

/**
 * 一致するキーの一覧を返す
 * priorityが0のとき完全一致
 * 1のとき前方一致
 * 2のとき部分一致
 *
 * @param arr 検索対象のキーの配列
 * @param query lowercaseになっているクエリ
 * @param f キーから検索対象の文字列を取得する関数
 */
export const searchListCaseInsensitive = <T>(
  arr: readonly T[],
  _query: string,
  f: (v: T) => string
): T[] => {
  const query = _query.toLowerCase()
  const result: Array<{ value: T; priority: number }> = []

  for (const val of arr) {
    const valLower = f(val).toLowerCase()
    if (valLower === query) {
      result.push({ value: val, priority: 0 })
    } else if (valLower.startsWith(query)) {
      result.push({ value: val, priority: 1 })
    } else if (valLower.includes(query)) {
      result.push({ value: val, priority: 2 })
    }
  }

  return result
    .toSorted((a, b) => a.priority - b.priority)
    .map(({ value }) => value)
}
