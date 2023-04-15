export const isValidLength = (value: string, min: number, max: number) => {
  if (value.length < min) return false
  if (value.length > max) return false
  return true
}

export const isValidUrl = (link: string) => {
  let url
  try {
    url = new URL(link)
  } catch {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}
