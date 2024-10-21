<script lang="ts" setup>
import {
  Semester,
  YearWithSemester,
  YearWithSemesterDuration
} from '/@/lib/apis'
import RequiredChip from '/@/components/UI/RequiredChip.vue'
import { Option } from '/@/components/UI/BaseSelect.vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'
import { computed } from 'vue'

// vue-selectが上手く初期値を表示してくれないため、valueはstringで扱い、オブジェクトで入出力を行っている

interface Props {
  yearsAgo?: number
}

const props = withDefaults(defineProps<Props>(), {
  yearsAgo: 20
})

const model = defineModel<Partial<YearWithSemesterDuration>>({
  required: true
})

const currentYear = new Date().getFullYear()
const options = computed<Option<string | undefined>[]>(() =>
  Array(props.yearsAgo)
    .fill(null)
    .flatMap((_, i) => [
      {
        label: `${currentYear - i} 後期`,
        value: `${currentYear - i} ${Semester.second}`
      },
      {
        label: `${currentYear - i} 前期`,
        value: `${currentYear - i} ${Semester.first}`
      }
    ])
)
const untilOptions = computed(() => [
  {
    label: '未定',
    value: undefined
  },
  ...options.value
])

// ラベルとして表示する文字列
const yearWithSemesterToString = (value: YearWithSemester) =>
  `${value.year} ${value.semester}`

// 親コンポーネントに出力するために、stringをobjectに変換
const stringToYearWithSemester = (value: string): YearWithSemester => {
  const [year, semester] = value.split(' ')
  return {
    year: Number(year),
    semester: Number(semester) as Semester
  }
}
</script>

<template>
  <div :class="$style.container">
    <div>
      <div :class="$style.sinceHead">
        <p :class="$style.head">
          開始
        </p>
        <required-chip />
      </div>
      <div :class="$style.form">
        <!--modelValueはオブジェクトを文字列に変換している-->
        <base-select
          :options="options"
          :class="$style.input"
          :model-value="
            model.since ? yearWithSemesterToString(model.since) : undefined
          "
          @update:model-value="
            model.since =
              $event !== undefined
                ? stringToYearWithSemester($event)
                : undefined
          "
        />
      </div>
    </div>
    <p :class="$style.wave">
      ～
    </p>
    <div>
      <div :class="$style.untilHead">
        <p :class="$style.head">
          終了
        </p>
      </div>
      <div :class="$style.form">
        <!--modelValueはオブジェクトを文字列に変換している-->
        <base-select
          :options="untilOptions"
          :class="$style.input"
          :model-value="
            model.until ? yearWithSemesterToString(model.until) : undefined
          "
          @update:model-value="
            model.until =
              $event !== undefined
                ? stringToYearWithSemester($event)
                : undefined
          "
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
.wave {
  height: 34px;
  display: flex;
  align-items: center;
}
</style>
