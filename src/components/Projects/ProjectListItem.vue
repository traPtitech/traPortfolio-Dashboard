<template>
  <div>
    <router-link :class="$style.link" :to="`/projects/${project.id}`">
      <span :class="$style.name">{{ project.name }}</span>
      <span :class="$style.date">({{ date }}~)</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Project, Semester } from '/@/lib/apis'

export default defineComponent({
  name: 'ProjectListItem',
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true
    }
  },
  setup(props) {
    const date = computed(() => {
      const semester =
        props.project.duration.since.semester == Semester.first
          ? '前期'
          : '後期'
      return `${props.project.duration.since.year}${semester}`
    })
    return { date }
  }
})
</script>

<style lang="scss" module>
.link {
  text-decoration: none;
}
.name {
  color: $color-text;
  font-size: 3rem;
}
.date {
  color: $color-text;
  font-size: 1.5rem;
  margin: 0 0.5em;
}
</style>
