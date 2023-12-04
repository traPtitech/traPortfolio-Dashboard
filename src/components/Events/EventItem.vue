<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import apis, {
  EventDetail,
  Event,
  EditEventRequest,
  EventLevel
} from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import { getFullDayString } from '/@/lib/date'
import EventLevelMenu from '/@/components/Events/EventLevelMenu.vue'
import {
  eventLevelValueMap,
  getEventLevelFromValue,
  eventLevels,
  type EventLevelValue
} from '/@/consts/eventLevel'

interface Props {
  event: Event
}

const props = defineProps<Props>()

const displayMenu = ref<boolean>(false)

const eventDetail: EventDetail = (await apis.getEvent(props.event.id)).data
const eventLevelValue = ref<EventLevelValue>(
  eventLevelValueMap[eventDetail.eventLevel]
)

const editReq = ref<EditEventRequest>()
const currentEventLevel = ref<EventLevel>(EventLevel.Anonymous)

const updateEventLevel = (eventLevel: EventLevelValue) => {
  eventLevelValue.value = eventLevel
  currentEventLevel.value = getEventLevelFromValue(eventLevelValue.value)
  editReq.value = { eventLevel: currentEventLevel.value }
  apis.editEvent(props.event.id, editReq.value)
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
onBeforeUnmount(() => {
  removeEventListener('click', clickOutside)
})
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
    <div :class="$style.displayMenu">
      <button
        ref="element"
        :class="$style.opener"
        @click="displayMenu = displayMenu ? false : true"
      >
        <span
          v-for="[level, detail] in Object.entries(eventLevels)"
          :key="level"
        >
          <span
            v-if="eventLevelValue === level"
            :class="$style.eventLevelMenuButton"
          >
            <p :class="$style.statusName">{{ detail.label }}</p>
          </span>
        </span>
        <span v-if="displayMenu" ref="element">
          <icon name="mdi:chevron-up" :class="$style.icon" />
        </span>
        <span v-else ref="element">
          <icon name="mdi:chevron-down" :class="$style.icon" />
        </span>
      </button>
      <event-level-menu
        v-if="displayMenu"
        :event-level="eventLevelValue"
        :style="$style.menu"
        @update-event-level="updateEventLevel"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.link {
  color: inherit;
  text-decoration: none;
  margin-right: auto;
  padding-right: auto;
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

.opener {
  display: flex;
}

.displayMenu {
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
