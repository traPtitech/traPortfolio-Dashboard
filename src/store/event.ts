import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { Event } from '/@/lib/apis'

export const useEventStore = defineStore('event', () => {
  const events = ref<Event[] | null>(null)

  const fetchEvents = async () => {
    if (events.value !== null) {
      return events.value
    }

    events.value = (await apis.getEvents()).data
  }

  return {
    events,
    fetchEvents
  }
})
