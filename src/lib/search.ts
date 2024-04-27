export const searchListCaseInsensitive = <T extends { name: string }>(
  list: T[],
  _query: string
): T[] => {
  const query = _query.toLowerCase()
  return list.filter(item => item.name.toLowerCase().includes(query))
}
