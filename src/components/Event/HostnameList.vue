<template>
  <section>
    <section-title>主催者</section-title>
    <div :class="$style.container">
      <hostname-list-item
        v-for="hostname in hostnames"
        :key="hostname.id"
        :hostname="hostname"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { User } from '/@/lib/apis'
import HostnameListItem from './HostnameListItem.vue'
import SectionTitle from '/@/components/Layout/SectionTitle.vue'

export default defineComponent({
  name: 'HostnameList',
  components: {
    HostnameListItem,
    SectionTitle
  },
  props: {
    hostnames: {
      type: Array as PropType<User[]>,
      default: []
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}
</style>
