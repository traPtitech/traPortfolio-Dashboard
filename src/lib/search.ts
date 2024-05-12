export const searchListCaseInsensitive = <
  K extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Index signature for type 'string' is missing in type を回避
  T extends Record<K, string> & Record<PropertyKey, any>
>(
  list: T[],
  _query: string,
  key: K
): T[] => {
  const query = _query.toLowerCase()
  return list.filter(item => item[key].toLowerCase().includes(query))
}
