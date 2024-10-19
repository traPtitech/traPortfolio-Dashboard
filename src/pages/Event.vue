<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'
import EventHostItem from '/@/components/Event/EventHostItem.vue'

import apis, { EditEventRequest, EventDetail } from '/@/lib/apis'
import { useRouter } from 'vue-router'
import { getDisplayDuration } from '/@/lib/date'
import useParam from '/@/lib/param'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import RadioButton from '/@/components/UI/RadioButton.vue'
import {
  eventLevelValueMap,
  getEventLevelFromValue
} from '/@/consts/eventLevel'
import { EventLevelValue } from '/@/consts/eventLevel'
import { useEventStore } from '/@/store/event'

const router = useRouter()
const toast = useToast()
const { mutate } = useEventStore()

const eventId = useParam('id')
const event: EventDetail = (await apis.getEvent(eventId.value)).data

const eventLevel = ref<EventLevelValue>(eventLevelValueMap[event.level])

const isSending = ref(false)
const updateEvent = async () => {
  isSending.value = true
  try {
    const requestData: EditEventRequest = {
      level: getEventLevelFromValue(eventLevel.value)
    }
    await apis.editEvent(eventId.value, requestData)
    mutate()
    toast.success('イベント情報を更新しました')
    router.push(`/events/${eventId.value}`)
  } catch {
    toast.error('イベント情報の更新に失敗しました')
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
          { title: 'Events', path: { name: 'Events' } },
          {
            title: event.name,
            path: { name: 'Event', params: { id: eventId } }
          }
        ]"
        detail="イベントの詳細を確認します。"
        :class="$style.header"
      />
    </div>
    <div>
      <section :class="$style.section">
        <h2 :class="$style.h2">イベント名</h2>
        <p :class="$style.content">
          {{ event.name }}
        </p>
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
        <p :class="$style.content">
          {{ event.description }}
        </p>
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

      <section :class="$style.section">
        <h2 :class="$style.h2">公開設定</h2>
        <div :class="[$style.content, $style.radioButtons]">
          <radio-button
            v-model="eventLevel"
            label="公開"
            value="public"
            description="ポートフォリオにて公開します"
          />
          <radio-button
            v-model="eventLevel"
            label="匿名公開"
            value="anonymous"
            description="企画者の名前を伏せて、ポートフォリオにて公開します"
          />
          <radio-button
            v-model="eventLevel"
            label="非公開"
            value="private"
            description="ポートフォリオにて公開しません"
          />
        </div>
      </section>
    </div>

    <div :class="$style.buttonContainer">
      <link-button
        :to="{ name: 'Events' }"
        :class="$style.backButton"
        type="secondary"
        icon="mdi:arrow-left"
      >
        Back
      </link-button>
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
  margin-bottom: 2rem;
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
.radioButtons {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 1.25rem;
  width: 60%;
}
.buttonContainer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

@media (width <= 768px) {
  .radioButtons {
    width: 100%;
  }
}
</style>
