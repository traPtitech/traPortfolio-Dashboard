export const searchListCaseInsensitive = <T,>(
  list: T[],
  _query: string,
  key: keyof T
): T[] => {
  const value = list[0]?.[key]
  if (typeof value !== 'string') {
    throw new Error(
      `The value corresponds to a given key ${key.toString()} must be string`
    )
  }
  const query = _query.toLowerCase()
  // valueがstringなので、item[key]もstringなはず
  return list.filter(item =>
    (item[key] as string).toLowerCase().includes(query)
  )
}
