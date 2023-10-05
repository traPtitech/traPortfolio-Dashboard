<script lang="ts" setup>
import { Semester, YearWithSemesterDuration } from '/@/lib/apis'
import RequiredChip from '/@/components/UI/RequiredChip.vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'

type DateType = 'sinceYear' | 'sinceSemester' | 'untilYear' | 'untilSemester'

interface Props {
  modelValue: YearWithSemesterDuration
  sinceRequired?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: YearWithSemesterDuration): void
}>()

const yearOptions = Array(20)
  .fill(null)
  .map((_, i) => ({
    label: (new Date().getFullYear() - i).toString(),
    value: (new Date().getFullYear() - i).toString()
  }))
const semesterOptions = [
  { label: '前期', value: Semester.first.toString() },
  { label: '後期', value: Semester.second.toString() }
]

const handleInput = (value: string, dateType: DateType) => {
  const numValue = parseInt(value)
  const duration: YearWithSemesterDuration = {
    since: {
      year: dateType === 'sinceYear' ? numValue : props.modelValue.since.year,
      semester:
        dateType === 'sinceSemester'
          ? numValue
          : props.modelValue.since.semester
    },
    until: props.modelValue.until && {
      year: dateType === 'untilYear' ? numValue : props.modelValue.until.year,
      semester:
        dateType === 'untilSemester'
          ? numValue
          : props.modelValue.until.semester
    }
  }
  emit('update:modelValue', duration)
}
</script>

<template>
  <div :class="$style.container">
    <div>
      <div :class="$style.sinceHead">
        <p :class="$style.head">～から</p>
        <required-chip v-if="sinceRequired" />
      </div>
      <div :class="$style.form">
        <div :class="$style.yearForm">
          <base-select
            :options="yearOptions"
            :class="$style.yearInput"
            :model-value="modelValue.since.year.toString()"
            @update:model-value="handleInput($event, 'sinceYear')"
          />年
        </div>
        <base-select
          :options="semesterOptions"
          :model-value="modelValue.since.semester.toString()"
          @update:model-value="handleInput($event, 'sinceSemester')"
        />
      </div>
    </div>
    <p :class="$style.wave">～</p>
    <div>
      <div :class="$style.untilHead">
        <p :class="$style.head">～まで</p>
      </div>
      <div :class="$style.form">
        <div :class="$style.yearForm">
          <base-select
            :options="yearOptions"
            :class="$style.yearInput"
            :model-value="
              modelValue.until?.year.toString() ??
              new Date().getFullYear().toString()
            "
            @update:model-value="handleInput($event, 'untilYear')"
          />年
        </div>
        <base-select
          :options="semesterOptions"
          :model-value="modelValue.until?.semester.toString() ?? '前期'"
          @update:model-value="handleInput($event, 'untilSemester')"
        />
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
.yearForm {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.yearInput {
  width: 8.75rem;
}
</style>
