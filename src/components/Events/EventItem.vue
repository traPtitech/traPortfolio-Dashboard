<script lang="ts" setup>
import {ref} from 'vue'
import type { Event } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import { getFullDayString } from '/@/lib/date'
import EventLevelMenu from '/@/components/Events/EventLevelMenu.vue'
import { EventLevelValue } from '/@/consts/eventLevel'

interface Props {
  event: Event
}

const displayMenu = ref<boolean>(false)
const aaa = ref<EventLevelValue>("private")

defineProps<Props>()
</script>

<template>
  <div :class="$style.container">
    <router-link :to="`/events/${event.id}`" :class="$style.link">
      <p :class="$style.name">{{ event.name }}</p>
      <p :class="$style.duration">
        <icon name="mdi:calendar" />
        {{ getFullDayString(new Date(event.duration.since)) }}
      </p> 
    </router-link>
    <button @click="displayMenu = displayMenu ? false : true">aa</button>
  </div>
  <div v-if="displayMenu">
    <event-level-menu :event-level="aaa" >aaa</event-level-menu>
  </div>
</template>

<style lang="scss" module>
.link {
  color: inherit;
  text-decoration: none;
}
.container {
  padding: 0.5rem;

  border: 1px solid $color-primary-text;
  border-radius: 8px;

  display: flex;
}

.name {
  color: $color-primary;
  font-size: 1.125rem;
}

.duration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
