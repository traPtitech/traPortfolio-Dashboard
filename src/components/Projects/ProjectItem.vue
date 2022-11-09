<script lang="ts" setup>
import { Project } from '/@/lib/apis'
import { getGroupOrProjectDuration } from '/@/lib/date'
import Icon from '/@/components/UI/Icon.vue'

interface Props {
  project: Project
}

defineProps<Props>()
</script>

<template>
  <router-link :to="`/projects/${project.id}/edit`" :class="$style.link">
    <div :class="$style.container">
      <p :class="$style.name">{{ project.name }}</p>
      <p :class="$style.duration">
        <icon name="mdi:calendar" />{{
          getGroupOrProjectDuration(project.duration)
        }}
      </p>
    </div>
  </router-link>
</template>

<style lang="scss" module>
.link {
  color: inherit;
  text-decoration: none;
}

.container {
  padding: 0.5rem;

  border: 1px solid $color-primary-text;
  border-radius: 8px;
}

.name {
  color: $color-primary;
  font-size: 1.125rem;
}

.duration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
