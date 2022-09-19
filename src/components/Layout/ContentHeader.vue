<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'

type HeaderText = {
  title: string,
  url?: string,
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
    <div :class="$style.titleContainer">
      <Icon :class="$style.icon" :name="props.iconName" :size="48" />
      <template v-for="(headerText, index) in props.headerTexts" :key="index">
        <Icon v-if="index !== 0" :class="$style.chevron" name="akar-icons:chevron-right" :size="30" />
        <router-link :to="headerText.url ?? ''" :class="$style.link">
          <h1 :class="$style.title">{{ headerText.title }}</h1>
        </router-link>
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

.link {
  text-decoration: none;

  &:visited {
    color: $color-primary;
  }

  &:hover {
    text-decoration: underline;
  }
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
