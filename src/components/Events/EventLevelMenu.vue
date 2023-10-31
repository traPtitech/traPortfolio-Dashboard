<script lang="ts" setup>
import { EventLevel } from '/@/lib/apis'
import { eventLevels } from '/@/consts/eventLevel.ts'

interface Props {
  eventLevel: EventLevel
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update-public-status', value: string): void
}>()
</script>

<template>
  <div :class="$style.eventLevelMenu">
    <div v-for="[level, detail] in eventLevels" :key="level">
      <button
        :class="[$style.eventLevelMenuButton]"
        :disabled="eventLevel === level"
        @click="emit('update-public-status', 'open')"
      >
        <p :class="$style.statusName">{{ detail.label }}</p>
        <p :class="$style.description">{{ detail.description }}</p>
      </button>
    </div>
  </div>
</template>

<style lang="scss" module>
.eventLevelMenu {
  width: 212px;
  height: max-content;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  border: 1px solid $color-secondary;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.eventLevelMenuButton {
  width: 180px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
  .description {
    font-size: 12px;
    font-weight: 400;
    color: $color-secondary;
  }
  .statusName {
    font-size: 16px;
    font-weight: 600;
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
