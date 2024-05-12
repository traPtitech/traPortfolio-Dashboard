<script lang="ts" setup>
import FormDate from '/@/components/UI/FormDate.vue'
import { Duration } from '/@/lib/apis'
import RequiredChip from '/@/components/UI/RequiredChip.vue'

type DateType = 'since' | 'until'

interface Props {
  sinceRequired?: boolean
}

defineProps<Props>()
const model = defineModel<Duration>({ required: true })

const handleInput = (value: string, dateType: DateType) => {
  const duration: Duration = {
    since: dateType === 'since' ? value : model.value.since,
    until: dateType === 'until' ? value : model.value.until
  }
  model.value = duration
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.formDate">
      <div :class="$style.sinceHead">
        <p :class="$style.head">開始</p>
        <required-chip v-if="sinceRequired" />
      </div>
      <form-date
        :model-value="model.since"
        @update:model-value="handleInput($event, 'since')"
      />
    </div>
    <p :class="$style.wave">～</p>
    <div :class="$style.formDate">
      <div :class="$style.untilHead">
        <p :class="$style.head">終了</p>
      </div>
      <form-date
        :model-value="model.until ?? ''"
        @update:model-value="handleInput($event, 'until')"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  align-items: flex-end;
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
.wave {
  height: 44px;
  display: flex;
  align-items: center;
}
</style>
