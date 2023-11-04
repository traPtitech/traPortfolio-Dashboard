import { EventLevel } from '/@/lib/apis'

export const eventLevelValueMap = Object.freeze({
  [EventLevel.Public]: 'public',
  [EventLevel.Anonymous]: 'anonymous',
  [EventLevel.Private]: 'private'
}) satisfies Record<EventLevel, string>

type EventLevelValueMap = typeof eventLevelValueMap

export type EventLevelValue = EventLevelValueMap[keyof EventLevelValueMap]

interface EventLevelDetail<Level extends EventLevel = EventLevel> {
  label: string
  value: Level
  description: string
}

type EventLevelMap = {
  [K in EventLevel as EventLevelValueMap[K]]: EventLevelDetail<K>
}

export const eventLevels = Object.freeze({
  public: {
    label: '公開',
    value: EventLevel.Public,
    description: 'ポートフォリオにて公開します'
  },
  anonymous: {
    label: '匿名公開',
    value: EventLevel.Anonymous,
    description: '企画者の名前を伏せて、ポートフォリオにて公開します'
  },
  private: {
    label: '非公開',
    value: EventLevel.Private,
    description: 'ポートフォリオにて公開しません'
  }
}) satisfies EventLevelMap

export const getEventLevelFromValue = (
  value: EventLevelValue
): EventLevel => {
  return eventLevels[value].value
}
