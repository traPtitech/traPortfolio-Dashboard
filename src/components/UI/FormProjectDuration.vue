<script lang="ts" setup>
import {
  Semester,
  YearWithSemester,
  YearWithSemesterDuration
} from '/@/lib/apis'
import RequiredChip from '/@/components/UI/RequiredChip.vue'
import { Option } from '/@/components/UI/BaseSelect.vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'

type DateType = 'sinceYear' | 'sinceSemester' | 'untilYear' | 'untilSemester'

interface Props {
  modelValue: YearWithSemesterDuration
  yearsAgo?: number
  sinceRequired?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  yearsAgo: 20
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: YearWithSemesterDuration): void
}>()
const options: Option<YearWithSemester>[] = Array(props.yearsAgo)
  .fill(null)
  .map((_, i) => [
    {
      label: (new Date().getFullYear() - i).toString() + ' 前期',
      value: {
        year: new Date().getFullYear() - i,
        semester: Semester.first
      }
    },
    {
      label: (new Date().getFullYear() - i).toString() + ' 後期',
      value: {
        year: new Date().getFullYear() - i,
        semester: Semester.second
      }
    }
  ])
  .flat()

const handleInput = (
  value: YearWithSemester | undefined,
  dateType: DateType
) => {
  const duration: YearWithSemesterDuration = {
    since:
      dateType === 'sinceYear' && value !== undefined
        ? value
        : props.modelValue.since,
    until: dateType === 'untilYear' ? value : props.modelValue.until
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
        <base-select
          :options="options"
          :class="$style.yearInput"
          :model-value="modelValue.since"
          @update:model-value="handleInput($event, 'sinceYear')"
        />
      </div>
    </div>
    <p :class="$style.wave">～</p>
    <div>
      <div :class="$style.untilHead">
        <p :class="$style.head">～まで</p>
      </div>
      <div :class="$style.form">
        <base-select
          :options="options"
          :class="$style.yearInput"
          :model-value="modelValue.until"
          @update:model-value="handleInput($event, 'untilYear')"
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
