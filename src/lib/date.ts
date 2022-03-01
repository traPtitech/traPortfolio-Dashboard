import { Duration, YearWithSemesterDuration, Semester } from '/@/lib/apis'

export const getTimeString = (date: Date): string =>
  date.getHours().toString().padStart(2, '0') +
  ':' +
  date.getMinutes().toString().padStart(2, '0')

export const getDayString = (date: Date): string =>
  (date.getMonth() + 1).toString().padStart(2, '0') +
  '/' +
  date.getDate().toString().padStart(2, '0')

export const getFullDayString = (date: Date): string =>
  date.getFullYear() + '/' + getDayString(date)

export const getFullDayWithTimeString = (date: Date): string =>
  getFullDayString(date) + ' ' + getTimeString(date)

// 2つの日時を比べ、同じ部分については省略したものを出力する
export const getDisplayDuration = (duration: Duration): string => {
  const sinceDate = new Date(duration.since)
  const sinceDateString = getFullDayWithTimeString(sinceDate)
  if (duration.until === undefined) {
    // まだ存続している場合
    return sinceDateString + ' ～'
  }
  const untilDate = new Date(duration.until)

  if (sinceDate.getFullYear() !== untilDate.getFullYear()) {
    return sinceDateString + ' ～ ' + getFullDayWithTimeString(untilDate)
  }
  if (
    sinceDate.getMonth() !== untilDate.getMonth() ||
    sinceDate.getDate() !== untilDate.getDate()
  ) {
    return (
      sinceDateString +
      ' ～ ' +
      getDayString(untilDate) +
      ' ' +
      getTimeString(untilDate)
    )
  }
  if (
    sinceDate.getHours() !== untilDate.getHours() ||
    sinceDate.getMinutes() !== untilDate.getMinutes()
  ) {
    return sinceDateString + ' ～ ' + getTimeString(untilDate)
  }
  return sinceDateString
}

const semesterToString = (semester: Semester): string => {
  return semester === Semester.first ? '前期' : '後期'
}

export const getGroupOrProjectDuration = (
  duration: YearWithSemesterDuration
): string => {
  const since = `${duration.since.year}${semesterToString(
    duration.since.semester
  )} ~`
  if (duration.until === undefined) {
    return since
  }
  const until = `${duration.until.year}${semesterToString(
    duration.until.semester
  )}`
  return `${since} ${until}`
}
