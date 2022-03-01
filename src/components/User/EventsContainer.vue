<template>
  <div>
    <div :class="$style.title">イベント一覧</div>
    <p v-for="event in events" :key="event.id">{{ event.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Event } from '/@/lib/apis'

export default defineComponent({
  name: 'EventsContainer',
  props: {
    events: {
      type: Array as PropType<Event[]>,
      default: []
    }
  }
})
</script>

<style lang="scss" module>
.title {
  color: $color-text;
  font-size: 2.25rem;
}
</style>
