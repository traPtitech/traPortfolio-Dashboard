<script lang="ts" setup>
import { computed, ref } from 'vue'

import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import EventTypeAccordion from '/@/components/UI/EventTypeAccordion.vue'
import EventItem from '/@/components/Events/EventItem.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { useEventStore } from '/@/store/event'
import {
  type EventLevelValueWithAll,
  eventLevelValueMap
} from '/@/consts/eventLevel'
import { searchListCaseInsensitive } from '/@/lib/search'

const eventStore = useEventStore()
const events = await eventStore.fetchEvents()
const eventType = ref<EventLevelValueWithAll>('all')

const searchQuery = ref('')

const filteredEventsByLevel = computed(() => {
  if (eventType.value === 'all') {
    return events
  } else {
    return events.filter(
      event => eventLevelValueMap[event.level] === eventType.value
    )
  }
})
const filteredEventsBySearch = computed(() =>
  searchListCaseInsensitive(
    filteredEventsByLevel.value,
    searchQuery.value,
    v => v.name
  )
)
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:calendar"
      :header-texts="[{ title: 'Events', url: '/events' }]"
      detail="イベントの公開設定を変更します"
      :class="$style.header"
    />
    <div :class="$style.searchFormContainer">
      <div :class="$style.searchForm">
        <form-input
          v-model="searchQuery"
          placeholder="イベント名で検索"
          icon="magnify"
        />
      </div>
      <div>
        <p :class="$style.body2">公開設定で絞り込み</p>
        <event-type-accordion v-model="eventType" />
      </div>
    </div>
    <ul :class="$style.eventList">
      <li v-for="event in filteredEventsBySearch" :key="event.id">
        <event-item :event="event" />
      </li>
    </ul>
  </page-container>
</template>

<style lang="scss" module>
.header {
  margin-bottom: 2rem;
}

.searchFormContainer {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.searchForm {
  flex-grow: 1;
}

.eventList {
  list-style: none;
  li {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
