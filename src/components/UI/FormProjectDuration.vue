<script lang="ts" setup>
import {
  Semester,
  YearWithSemester,
  YearWithSemesterDuration
} from '/@/lib/apis'
import RequiredChip from '/@/components/UI/RequiredChip.vue'
import { Option } from '/@/components/UI/BaseSelect.vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'

type DateType = 'since' | 'until'

interface Props {
  modelValue: YearWithSemesterDuration
  yearsAgo?: number
  sinceRequired?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  yearsAgo: 20
})
const emit = defineEmits<{
  (
    e: 'update:modelValue',
    modelValue: {
      since: YearWithSemester | undefined
      until: YearWithSemester | undefined
    }
  ): void
}>()
const options: Option<YearWithSemester | undefined>[] = Array(props.yearsAgo)
  .fill(null)
  .flatMap((_, i) => [
    {
      label: `${(new Date().getFullYear() - i).toString()} 後期`,
      value: {
        year: new Date().getFullYear() - i,
        semester: Semester.second
      }
    },
    {
      label: `${(new Date().getFullYear() - i).toString()} 前期`,
      value: {
        year: new Date().getFullYear() - i,
        semester: Semester.first
      }
    }
  ])

const untilOptions = [
  {
    label: '未定',
    value: undefined
  },
  ...options
]

const sinceOptions = props.sinceRequired ? options : untilOptions

const handleInput = (
  value: YearWithSemester | undefined,
  dateType: DateType
) => {
  const duration = {
    since: dateType === 'since' ? value : props.modelValue.since,
    until: dateType === 'until' ? value : props.modelValue.until
  }
  emit('update:modelValue', duration)
}

const compare = (
  a: YearWithSemester | undefined,
  b: YearWithSemester | undefined
) => {
  if (a === undefined && b === undefined) return true
  if (a === undefined || b === undefined) return false
  return a.year === b.year && a.semester === b.semester
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
          :options="sinceOptions"
          :class="$style.input"
          :model-value="modelValue.since"
          :by="compare"
          @update:model-value="handleInput($event, 'since')"
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
          :options="untilOptions"
          :class="$style.input"
          :model-value="modelValue.until"
          :by="compare"
          @update:model-value="handleInput($event, 'until')"
        />
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
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
  flex-wrap: nowrap;
}
.yearForm {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.input {
  width: 10rem;
}
</style>
