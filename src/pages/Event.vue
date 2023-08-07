<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import EventHostItem from '/@/components/Event/EventHostItem.vue'

import apis, { EditEventRequest, EventDetail } from '/@/lib/apis'
import { RouterLink, useRouter } from 'vue-router'
import { getDisplayDuration } from '/@/lib/date'
import useParam from '/@/use/param'
import { useDataFetcher } from '/@/use/fetcher'
import { ref } from 'vue'

const router = useRouter()

const eventId = useParam('id')
const { data: event } = useDataFetcher<EventDetail>(() =>
  apis.getEvent(eventId.value)
)

const eventLevel = ref(event.value?.eventLevel ?? 0)

const isSending = ref(false)
const updateEvent = async () => {
  isSending.value = true
  try {
    const requestData: EditEventRequest = {
      eventLevel: eventLevel.value
    }
    await apis.editEvent(eventId.value, requestData)
    //eslint-disable-next-line no-console
    console.log('更新しました') // todo:トーストとかに変えたい
    router.push(`/events/${eventId.value}`)
  } catch {
    //eslint-disable-next-line no-console
    console.log('更新に失敗しました')
  }
  isSending.value = false
}
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:calendar"
        :header-texts="[
          { title: 'Events', url: '/events' },
          { title: event?.name ?? '', url: `/events/${eventId}` }
        ]"
        detail="イベントの詳細を確認します。"
        :class="$style.header"
      />
    </div>
    <div v-if="event !== undefined">
      <section :class="$style.section">
        <h2 :class="$style.h2">イベント名</h2>
        <p :class="$style.content">{{ event.name }}</p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">日時</h2>
        <p :class="$style.content">
          {{ getDisplayDuration(event.duration) }}
        </p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">場所</h2>
        <p :class="$style.content">
          {{ event.place }}
        </p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">説明</h2>
        <p :class="$style.content">{{ event.description }}</p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">主催者</h2>
        <event-host-item
          v-for="host in event.hostname"
          :key="host.id"
          :class="$style.content"
          :host="host"
        />
      </section>

      <!--todo: 公開設定のフォームを入れる-->
    </div>

    <div :class="$style.buttonContainer">
      <router-link to="/events" :class="$style.link">
        <base-button
          :class="$style.backButton"
          type="secondary"
          icon="mdi:arrow-left"
        >
          Back
        </base-button>
      </router-link>
      <base-button
        :is-disabled="isSending"
        type="primary"
        icon="mdi:update"
        @click="updateEvent"
      >
        Update
      </base-button>
    </div>
  </page-container>
</template>

<style lang="scss" module>
.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  margin: 4rem 0 2rem;
}
.link {
  text-decoration: none;
  color: inherit;
}
.section {
  margin-bottom: 2rem;
}
.h2 {
  font-weight: bold;
  font-size: 1.25rem;
}
.content {
  margin-top: 0.5rem;
  padding-left: 0.5rem;
}
.contestLinkContainer {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.contestLink {
  color: $color-text;
}
.buttonContainer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
