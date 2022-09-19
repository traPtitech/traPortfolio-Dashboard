<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'

interface Props {
  iconName: string
  title: Array<string>
  detail: string
}
const props = defineProps<Props>()

const titleList = props.title.map((text, index) => ({ id: index, text: text }))
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.titleContainer">
      <icon :class="$style.icon" :name="props.iconName" :size="48" />
      <template v-for="{ id, text } in titleList" :key="id">
        <Icon
          v-if="id !== 0"
          :class="$style.chevron"
          name="akar-icons:chevron-right"
          :size="30"
        />
        <h1 :class="$style.title">{{ text }}</h1>
      </template>
    </div>
    <p :class="$style.detail">{{ props.detail }}</p>
  </div>
</template>

<style lang="scss" module>
.container {
  margin: 2rem 0;
}
.titleContainer {
  display: flex;
  align-items: center;
  color: $color-primary;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.5rem;
}

.icon {
  display: flex;
  gap: 0.25rem;
}
.chevron {
  display: flex;
}

.detail {
  color: $color-secondary;
  font-size: 0.875rem;
}
</style>
