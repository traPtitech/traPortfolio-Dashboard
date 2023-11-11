<script lang="ts" setup>
import {
  EventLevelValue,
  eventLevelValueMap,
  eventLevels
} from '/@/consts/eventLevel'

interface Props {
  eventLevel: EventLevelValue
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update-event-level', value: EventLevelValue): void
}>()
</script>

<template>
  <div :class="$style.eventLevelMenu">
    <div v-for="[level, detail] in Object.entries(eventLevels)" :key="level">
      <button
        :class="$style.eventLevelMenuButton"
        :disabled="eventLevel === level"
        @click="emit('update-event-level', eventLevelValueMap[detail.value])"
      >
        <p :class="$style.statusName">{{ detail.label }}</p>
        <p :class="$style.description">
          {{ detail.description }}
        </p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" module>
.eventLevelMenu {
  width: max-content;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  border: 1px solid $color-secondary;
  border-radius: 0.375rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.eventLevelMenuButton {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  .description {
    font-size: 0.75rem;
    color: $color-secondary;
    // タイポグラフィのため改行を有効に
    white-space: pre-wrap;
  }
  .statusName {
    font-weight: bold;
    color: $color-secondary;
  }
  &:disabled {
    & .statusName {
      color: $color-primary;
    }
    & .description {
      color: $color-text;
    }
  }
}
</style>
