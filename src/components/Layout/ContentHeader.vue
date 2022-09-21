<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'

type HeaderText = {
  title: string
  url: string
}

interface Props {
  iconName: string
  headerTexts: Array<HeaderText>
  detail: string
}
const props = defineProps<Props>()
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.titleContainer">
      <icon :class="$style.icon" :name="props.iconName" :size="48" />
      <template v-for="(headerText, index) in props.headerTexts" :key="index">
        <icon
          v-if="index !== 0"
          :class="$style.chevron"
          name="akar-icons:chevron-right"
          :size="30"
        />
        <router-link
          v-if="index !== props.headerTexts.length - 1"
          :to="headerText.url"
          :class="$style.link"
        >
          {{ headerText.title }}
        </router-link>
        <span v-else>{{ headerText.title }}</span>
      </template>
    </h1>
    <p :class="$style.detail">{{ props.detail }}</p>
  </div>
</template>

<style lang="scss" module>
.container {
  padding-top: 4rem;
}
.titleContainer {
  display: flex;
  align-items: center;
  color: $color-primary;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.link {
  text-decoration: none;
  color: $color-primary;

  &:hover {
    text-decoration: underline;
  }
}

.icon {
  display: flex;
  margin-right: 0.25rem;
}

.chevron {
  display: flex;
}

.detail {
  color: $color-secondary;
  font-size: 0.875rem;
}
</style>
