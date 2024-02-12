<script lang="ts" setup>
import FormDate from '/@/components/UI/FormDate.vue'
import { Duration } from '/@/lib/apis'
import RequiredChip from '/@/components/UI/RequiredChip.vue'

type DateType = 'since' | 'until'

interface Props {
  modelValue: Duration
  sinceRequired?: boolean
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
      <div :class="$style.sinceHead">
        <p :class="$style.head">～から</p>
        <required-chip v-if="sinceRequired" />
      </div>
      <form-date
        :model-value="modelValue.since"
        @update:model-value="handleInput($event, 'since')"
      />
    </div>
    <p>～</p>
    <div :class="$style.formDate">
      <div :class="$style.untilHead">
        <p :class="$style.head">～まで</p>
      </div>
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
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.sinceHead {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.untilHead {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}
.head {
  font-size: 0.75rem;
}
</style>
