import { Duration, YearWithSemesterDuration } from '/@/lib/apis'

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

export const isValidDuration = (duration: Duration) => {
  if (duration.since && duration.until) {
    return duration.since <= duration.until
  }
  return false
}

export const isValidYearWithSemesterDuration = (
  duration: YearWithSemesterDuration
) => {
  if (duration.since && duration.until) {
    return (
      duration.since.year < duration.until.year ||
      (duration.since.year == duration.until.year &&
        duration.since.semester < duration.until.semester)
    )
  }
  return false
}
