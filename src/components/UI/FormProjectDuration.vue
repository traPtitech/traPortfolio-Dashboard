<script lang="ts" setup>
import { Semester, YearWithSemesterDuration } from '/@/lib/apis'
import RequiredChip from '/@/components/UI/RequiredChip.vue'
import { Option } from '/@/components/UI/BaseSelect.vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'
import { computed } from 'vue'
// vue-selectが上手く初期値を表示してくれないため、valueはstringで扱い、オブジェクトで入出力を行っている

type DateType = 'since' | 'until'

interface Props {
  yearsAgo?: number
  sinceRequired?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  yearsAgo: 20
})

const model = defineModel<Partial<YearWithSemesterDuration>>({
  required: true
})

const options = computed<Option<string | undefined>[]>(() =>
  Array(props.yearsAgo)
    .fill(null)
    .flatMap((_, i) => [
      {
        label: `${(new Date().getFullYear() - i).toString()} 後期`,
        value: `${new Date().getFullYear() - i} ${Semester.second}`
      },
      {
        label: `${(new Date().getFullYear() - i).toString()} 前期`,
        value: `${new Date().getFullYear() - i} ${Semester.first}`
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
const sinceOptions = computed(() =>
  props.sinceRequired ? options.value : untilOptions.value
)

// 出力。stringをオブジェクトに変換して出力
const handleInput = (value: string | undefined, dateType: DateType) => {
  const [year, semester] = value?.split(' ') ?? [undefined, undefined]
  model.value = {
    since:
      dateType === 'since'
        ? value !== undefined
          ? {
              year: Number(year),
              semester: Number(semester) as Semester
            }
          : undefined
        : model.value.since,
    until:
      dateType === 'until'
        ? value !== undefined
          ? {
              year: Number(year),
              semester: Number(semester) as Semester
            }
          : undefined
        : model.value.until
  }
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
        <!--modelValueはオブジェクトを文字列に変換している-->
        <base-select
          :options="sinceOptions"
          :class="$style.input"
          :model-value="
            model.since !== undefined
              ? `${model.since.year} ${model.since.semester}`
              : undefined
          "
          @update:model-value="handleInput($event, 'since')"
        />
      </div>
    </div>
    <p :class="$style.wave">～</p>
    <div>
      <div :class="$style.untilHead">
        <p :class="$style.head">終了</p>
      </div>
      <div :class="$style.form">
        <!--modelValueはオブジェクトを文字列に変換している-->
        <base-select
          :options="untilOptions"
          :class="$style.input"
          :model-value="
            model.until !== undefined
              ? `${model.until.year} ${model.until.semester}`
              : undefined
          "
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
import { computed } from 'vue'; import { computed } from 'vue'; import {
computed } from 'vue';
