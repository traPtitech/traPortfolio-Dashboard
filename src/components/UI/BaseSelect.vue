<script lang="ts" setup generic="T">
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import Icon from '/@/components/UI/Icon.vue'

export interface Option<T> {
  label: string
  value: T
}

interface Props {
  options: Option<T>[]
  by?: keyof T | ((a: T, b: T) => boolean)
  searchable?: boolean
}

const props = defineProps<Props>()

const model = defineModel<T>({ required: true })

const compare = (a: T, b: T) => {
  if (typeof props.by === 'function') {
    return props.by(a, b)
  }

  if (typeof props.by === 'string') {
    return a[props.by] === b[props.by]
  }

  if (
    a !== null &&
    b !== null &&
    typeof a === 'object' &&
    typeof b === 'object' &&
    'id' in a &&
    'id' in b
  ) {
    return a.id === b.id
  }

  return a === b
}
</script>

<template>
  <v-select
    v-model="model"
    :options="options"
    :clearable="false"
    label="label"
    :reduce="(option: Option<T>) => option.value"
    :class="$style.select"
    :searchable="searchable"
  >
    <template #option="{ label }">
      <div :class="$style.item">
        <icon
          v-if="label === options.find(o => compare(o.value, model))?.label"
          name="mdi:tick-circle-outline"
          :class="$style.icon"
        />
        <p :class="$style.label">
          {{ label }}
        </p>
      </div>
    </template>
  </v-select>
</template>

<style lang="scss" module>
.item {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 8px;
  align-items: center;
  .icon {
    color: $color-primary;
  }
  .label {
    display: grid;
    grid-column: 2;
  }
}

.select {
  --vs-border-radius: 8px;
  --vs-border-color: #{$color-primary};

  // dropdown のスタイル
  :global(.vs__dropdown-menu) {
    margin-top: 8px;
    border-top-style: solid;
    border-radius: var(--vs-border-radius);
    --vs-dropdown-option-padding: 4px 8px;

    --vs-dropdown-option--active-bg: #{$color-background-dim};
    --vs-dropdown-option--active-color: #{$color-text};
  }

  // combobox のスタイル
  :global(.vs__dropdown-toggle) {
    --vs-selected-color: #{$color-text};
    border-color: $color-secondary;
    border-radius: var(--vs-border-radius);

    // combobox の右側のアイコン
    --vs-actions-padding: 4px 8px 0 3px;
    --vs-controls-color: #{$color-secondary-text};
  }

  // dropdown が開いているときの combobox のスタイル
  &:global(.vs--open) {
    :global(.vs__dropdown-toggle) {
      border-color: var(--vs-border-color);
    }

    :global(.vs__selected) {
      opacity: 1;
    }
  }

  // 入力可能時のカーソルのスタイルを調整
  &:global(.vs--searchable) {
    :global(.vs__selected-options) {
      cursor: text;
    }
    :global(.vs__actions) {
      cursor: pointer;
    }
    input[aria-controls] {
      cursor: text;
    }
  }
}
</style>
