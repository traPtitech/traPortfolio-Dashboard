/**
 * オブジェクトや配列の全てのプロパティを再帰的にfreezeする
 *
 * 自己参照など閉路が存在する場合は無限ループに陥るので注意
 *
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
export const deepFreeze = <const T extends object>(obj: T): T => {
  const propNames = Object.getOwnPropertyNames(obj)

  for (const name of propNames) {
    const value = obj[name as keyof typeof obj]

    if (value && typeof value === 'object') {
      deepFreeze(value as Record<string, unknown>)
    }
  }

  return Object.freeze(obj)
}
