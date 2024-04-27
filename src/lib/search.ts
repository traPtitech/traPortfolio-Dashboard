export const searchListCaseInsensitive = <T extends { name: string }>(
  list: T[],
  query: string
): T[] =>
  list.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
