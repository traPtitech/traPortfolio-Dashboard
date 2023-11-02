import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { Event } from '/@/lib/apis'

export const useEventStore = defineStore('event', () => {
  const events = ref<Event[] | null>(null)
  const isDirty = ref(false)

  const fetchEvents = async () => {
    if (events.value !== null && !isDirty.value) {
      return events.value
    }

    const res = await apis.getEvents()
    events.value = res.data
    isDirty.value = false
    return res.data
  }

  const mutate = () => {
    isDirty.value = true

    void fetchEvents()
  }

  return {
    events,
    fetchEvents,
    mutate
  }
})
