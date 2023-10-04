import { EventLevel } from '/@/lib/apis'

interface EventLevelDetail {
  label: string
  value: string
  description: string
}

type EventLevelMap = Map<EventLevel, EventLevelDetail>

export const eventLevels: EventLevelMap = new Map([
  [
    EventLevel.Public,
    {
      label: '公開',
      value: 'public',
      description: 'ポートフォリオにて公開します'
    }
  ],
  [
    EventLevel.Anonymous,
    {
      label: '匿名公開',
      value: 'anonymous',
      description: '企画者の名前を伏せて、ポートフォリオにて公開します'
    }
  ],
  [
    EventLevel.Private,
    {
      label: '非公開',
      value: 'private',
      description: 'ポートフォリオにて公開しません'
    }
  ]
])

export const getEventLevelFromValue = (
  value: string
): EventLevel | undefined => {
  const entry = Array.from(eventLevels).find(
    ([, service]) => service.value === value
  )
  return entry?.[0]
}
