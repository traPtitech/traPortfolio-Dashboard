<template>
  <div>
    <router-link :class="$style.link" :to="`/groups/${group.id}`">
      <span :class="$style.name">{{ group.name }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Group } from '/@/lib/apis'

export default defineComponent({
  name: 'GroupListItem',
  props: {
    group: {
      type: Object as PropType<Group>,
      required: true
    }
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
</style>
