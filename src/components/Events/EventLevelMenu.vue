<script lang="ts" setup>
import { EventLevel } from '/@/lib/apis'
import { eventLevels } from '/@/consts/eventLevel'

interface Props {
  eventLevel: EventLevel
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update-public-status', value: EventLevel): void
}>()
</script>

<template>
  <div :class="$style.eventLevelMenu">
    <div v-for="[level, detail] in eventLevels" :key="level">
      <button
        :class="$style.eventLevelMenuButton"
        :disabled="eventLevel === level"
        @click="emit('update-public-status', level)"
      >
        <p :class="$style.statusName">{{ detail.label }}</p>
        <p :class="$style.description" style="">
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
    white-space: pre-wrap
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
