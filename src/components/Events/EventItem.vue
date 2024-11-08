<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

import apis, { Event, EditEventRequest, EventLevel } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import { getFullDayString } from '/@/lib/date'
import EventLevelMenu from '/@/components/Events/EventLevelMenu.vue'
import {
  eventLevelValueMap,
  getEventLevelFromValue,
  eventLevels,
  type EventLevelValue
} from '/@/consts/eventLevel'
import { useEventStore } from '/@/store/event'

interface Props {
  event: Event
}

const props = defineProps<Props>()

const displayMenu = ref(false)

const eventLevelValue = ref<EventLevelValue>(
  eventLevelValueMap[props.event.level]
)

const updateEventLevel = async (v: EventLevelValue) => {
  eventLevelValue.value = v
  const currentEventLevel: EventLevel = getEventLevelFromValue(v)
  const editReq: EditEventRequest = { level: currentEventLevel }
  await apis.editEvent(props.event.id, editReq)
  useEventStore().mutate()
}

const element = ref<HTMLDivElement | null>(null)

const clickOutside = (e: MouseEvent) => {
  // [対象の要素]が[クリックされた要素]を含まない場合
  if (e.target instanceof Node && !element.value?.contains(e.target)) {
    displayMenu.value = false
  }
}

// windowにセットしたイベントはremoveするのを忘れずに
onMounted(() => {
  addEventListener('click', clickOutside)
})
onUnmounted(() => {
  removeEventListener('click', clickOutside)
})
</script>

<template>
  <div :class="$style.container">
    <router-link
      :to="{ name: 'Event', params: { id: event.id } }"
      :class="$style.link"
    >
      <p :class="$style.name">
        {{ event.name }}
      </p>
      <p :class="$style.duration">
        <icon name="mdi:calendar" />
        {{ getFullDayString(new Date(event.duration.since)) }}
      </p>
    </router-link>
    <div :class="$style.displayMenu">
      <button
        ref="element"
        :class="$style.opener"
        @click="displayMenu = !displayMenu"
      >
        <span>
          {{ eventLevels[eventLevelValue].label }}
        </span>
        <span
          ref="element"
          :class="$style.icon"
          :is-menu-open="displayMenu"
        >
          <icon name="mdi:chevron-down" />
        </span>
      </button>
      <event-level-menu
        v-if="displayMenu"
        :event-level="eventLevelValue"
        :class="$style.menu"
        @update-event-level="updateEventLevel"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.link {
  flex-grow: 1;
  color: inherit;
  text-decoration: none;
}
.container {
  padding: 0.5rem;
  border: 1px solid $color-primary-text;
  border-radius: 8px;
  display: flex;
  &:hover {
    background-color: $color-background-dim;
  }
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

.opener {
  display: flex;
}

.displayMenu {
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
}
.icon {
  margin-left: 8px;
  &[is-menu-open='true'] {
    transform: rotate(-0.5turn);
  }
  transition: 0.5s;
}
</style>
