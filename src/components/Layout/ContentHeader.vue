<script lang="ts" setup>
import { RouteLocationNamedRaw } from 'vue-router'
import AIcon from '/@/components/UI/AIcon.vue'

type HeaderText = {
  title: string
  path: RouteLocationNamedRaw
}

interface Props {
  iconName: string
  headerTexts: Array<HeaderText>
}
const props = defineProps<Props>()
</script>

<template>
  <div>
    <h1 :class="$style.titleContainer">
      <a-icon
        :class="$style.icon"
        :name="props.iconName"
        :size="48"
      />
      <template
        v-for="(headerText, index) in props.headerTexts"
        :key="index"
      >
        <a-icon
          v-if="index !== 0"
          :class="$style.chevron"
          name="akar-icons:chevron-right"
          :size="30"
        />
        <router-link
          v-if="index !== props.headerTexts.length - 1"
          :to="headerText.path"
          :class="$style.link"
        >
          {{ headerText.title }}
        </router-link>
        <span v-else>{{ headerText.title }}</span>
      </template>
    </h1>
  </div>
</template>

<style lang="scss" module>
.titleContainer {
  display: flex;
  align-items: center;
  color: $color-primary;
  font-size: 1.5rem;
  flex-wrap: wrap;
}

.link {
  text-decoration: none;
  color: $color-primary;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
}

.icon {
  margin-right: 0.25rem;
}

.chevron {
  display: flex;
}
</style>
