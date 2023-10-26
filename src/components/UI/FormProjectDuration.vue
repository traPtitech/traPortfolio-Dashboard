<script lang="ts" setup>
import { Semester, YearWithSemesterDuration } from '/@/lib/apis'
import RequiredChip from '/@/components/UI/RequiredChip.vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'

type DurationType = 'since' | 'until'
type DurationDate = `${number} ${number}`

interface Props {
  modelValue: YearWithSemesterDuration
  sinceRequired?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: YearWithSemesterDuration): void
}>()

const options = Array(20)
  .fill(null)
  .map((_, i) => ({
    label: `${(new Date().getFullYear() - i).toString()} ${
      i % 2 ? '後期' : '前期'
    }`,
    value: `${(new Date().getFullYear() - i).toString()} ${
      i % 2 ? Semester.second.toString() : Semester.first.toString()
    }`
  }))

const handleInput = (value: DurationDate, dateType: DurationType) => {
  const parsedDuration = value.split(' ')
  const [year, semester] = parsedDuration.map(parseInt)
  if (!year || !semester) return
  const duration: YearWithSemesterDuration = {
    since: {
      year: dateType === 'since' ? year : props.modelValue.since.year,
      semester:
        dateType === 'since' ? semester : props.modelValue.since.semester
    },
    until: props.modelValue.until && {
      year: dateType === 'until' ? year : props.modelValue.until.year,
      semester:
        dateType === 'until' ? semester : props.modelValue.until.semester
    }
  }
  emit('update:modelValue', duration)
}
</script>

<template>
  <div :class="$style.container">
    <div>
      <div :class="$style.sinceHead">
        <p :class="$style.head">開始</p>
        <required-chip v-if="sinceRequired" />
      </div>
      <div :class="$style.form">
        <div :class="$style.field">
          <base-select
            :options="options"
            :class="$style.input"
            :model-value="`${modelValue.since.year} ${modelValue.since.semester}`"
            @update:model-value="handleInput($event, 'since')"
          />
        </div>
      </div>
    </div>
    <p :class="$style.wave">～</p>
    <div>
      <div :class="$style.untilHead">
        <p :class="$style.head">終了</p>
      </div>
      <div :class="$style.form">
        <div :class="$style.field">
          <base-select
            :options="options"
            :class="$style.input"
            :model-value="`${
              modelValue.until?.year ??
              new Date().getFullYear()
            } ${
              modelValue.until?.semester ?? Semester.first
            }`"
            @update:model-value="handleInput($event, 'until')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  align-items: flex-end;
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
.wave {
  height: 4rem;
  display: flex;
  align-items: center;
}
.head {
  font-size: 0.75rem;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.input {
  width: 8.75rem;
}
</style>
