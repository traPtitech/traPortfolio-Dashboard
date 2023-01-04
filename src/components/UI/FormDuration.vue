<script lang="ts" setup>
import FormDate from '/@/components/UI/FormDate.vue'
import { Duration } from '/@/lib/apis'

type DateType = 'since' | 'until'

interface Props {
  modelValue: Duration
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: Duration): void
}>()

const handleInput = (value: string, dateType: DateType) => {
  const duration: Duration = {
    since: dateType === 'since' ? value : props.modelValue.since,
    until: dateType === 'until' ? value : props.modelValue.until
  }
  emit('update:modelValue', duration)
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.formDate">
      <p :class="$style.body2">～から</p>
      <form-date
        :model-value="modelValue.since"
        @update:model-value="handleInput($event, 'since')"
      />
    </div>
    <p :class="$style.wave">～</p>
    <div :class="$style.formDate">
      <p :class="$style.body2">～まで</p>
      <form-date
        :model-value="modelValue.until ?? ''"
        @update:model-value="handleInput($event, 'until')"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}
.wave {
  height: 2.75rem;
  display: flex;
  align-items: center;
}
.body2 {
  font-size: 0.875rem;
}
</style>
