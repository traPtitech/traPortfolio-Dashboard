<template>
  <section>
    <section-title :class="$style.title">班一覧</section-title>
    <div :class="$style.container">
      <router-link
        v-for="group in groups"
        :key="group.id"
        :to="`/groups/${group.id}`"
        :class="$style.link"
      >
        <span :class="$style.name">{{ group.name }}</span>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Group } from '/@/lib/apis'
import SectionTitle from '../Layout/SectionTitle.vue'

export default defineComponent({
  name: 'GroupNameList',
  components: {
    SectionTitle
  },
  props: {
    groups: {
      type: Array as PropType<Group[]>,
      default: []
    }
  }
})
</script>

<style lang="scss" module>
.container {
  text-align: center;
}
.link {
  display: inline-block;
  margin: 0.5rem 1rem;
  text-decoration: none;
}
.name {
  font-size: 1.5rem;
  color: $color-text;
}
.title {
  color: $color-primary;
}
</style>
