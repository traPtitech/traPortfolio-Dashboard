<script lang="ts" setup>
import { EventLevel } from '/@/lib/apis'

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
    <button
      :class="[$style.eventLevelMenuButton]"
      :disabled="eventLevel === 1"
      @click="emit('update-public-status', 'open')"
    >
      <p :class="$style.statusName">公開</p>
      <p :class="$style.description">ポートフォリオにて公開します</p>
    </button>
    <button
      :class="[$style.eventLevelMenuButton]"
      :disabled="eventLevel === 0"
      @click="emit('update-public-status', 'anonymous')"
    >
      <p :class="$style.statusName">匿名公開</p>
      <p :class="$style.description">
        企画者の名前を伏せて、<br />ポートフォリオにて公開します
      </p>
    </button>
    <button
      :class="[$style.eventLevelMenuButton]"
      :disabled="eventLevel === 2"
      @click="emit('update-public-status', 'private')"
    >
      <p :class="$style.statusName">非公開</p>
      <p :class="$style.description">ポートフォリオにて公開しません</p>
    </button>
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
