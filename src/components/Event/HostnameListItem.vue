<template>
  <div>
    <router-link :class="$style.link" :to="`/users/${hostname.id}`">
      <img :src="iconSrc" :class="$style.icon" />
      <div :class="$style.desc">
        <div :class="$style.name">{{ hostname.name }}</div>
        <div v-if="hostname.realName" :class="$style.realName">
          {{ hostname.realName }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { User } from '/@/lib/apis'

export default defineComponent({
  name: 'HostnameListItem',
  props: {
    hostname: {
      type: Object as PropType<User>,
      required: true
    }
  },
  setup() {
    const iconSrc = computed(
      () =>
        `https://q.trap.jp/api/v3/public/icon/${
          /*props.hostname.name*/ 'sappi_red'
        }`
    )
    return { iconSrc }
  }
})
</script>

<style lang="scss" module>
.link {
  display: flex;
  text-decoration: none;
}
.desc {
  word-break: break-all;
}
.icon {
  height: 8rem;
  width: 8rem;
  margin-right: 2rem;
  border-radius: 50%;
}
.name {
  color: $color-text;
  font-size: 3rem;
}
.realName {
  color: $color-text;
  font-size: 1.5rem;
}
</style>
