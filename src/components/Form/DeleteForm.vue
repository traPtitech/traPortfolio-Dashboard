<script lang="ts" setup>
import BaseButton from '/@/components/UI/BaseButton.vue'
interface Props {
  target: string
  disabled?: boolean
}
defineProps<Props>()
const emit = defineEmits<{
  (e: 'delete'): void
}>()
</script>

<template>
  <div>
    <label :class="$style.label">{{ target }}を削除</label>
    <p :class="$style.description">
      {{ target }}を削除します。この操作は取り消せません。
    </p>
    <base-button
      :is-disabled="disabled"
      type="warning"
      icon="mdi:close"
      :class="$style.button"
      @click="emit('delete')"
    >
      Delete
    </base-button>
  </div>
</template>

<style lang="scss" module>
.label {
  color: $color-warning;
  font-size: 1.25rem;
  font-weight: bold;
}
.description {
  margin: 0.5rem 0;
  color: $color-secondary;
}
.button {
  margin-left: 0.5rem;
}
</style>
