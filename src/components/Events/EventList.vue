<template>
  <section :class="$style.container">
    <event-list-item v-for="event in events" :key="event.id" :event="event" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Event } from '/@/lib/apis'
import EventListItem from './EventListItem.vue'

export default defineComponent({
  name: 'EventList',
  components: {
    EventListItem
  },
  props: {
    events: {
      type: Array as PropType<Event[]>,
      default: []
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
}
</style>
