<template>
  <icon v-if="icon.type === 'icon'" :name="icon.name" :size="size" />
  <img v-else-if="icon.type === 'img'" :src="icon.path" :class="styles" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ComputedRef } from 'vue'
import Icon from '../UI/Icon.vue'
import { AccountType } from '/@/lib/apis'
import AtcoderImgPath from '/@/assets/AtCoder.svg'

export default defineComponent({
  name: 'ServiceIcon',
  components: { Icon },
  props: {
    accountType: {
      type: Object as PropType<AccountType>,
      required: true
    },
    size: {
      type: Number,
      default: 24
    }
  },
  setup(props) {
    type Icon = { type: 'icon'; name: string }
    type Img = { type: 'img'; path: string }
    type IconOrImg = Icon | Img
    const icon: ComputedRef<IconOrImg> = computed(() => {
      switch (props.accountType) {
        case AccountType.homepage:
          return { type: 'icon', name: 'mdi:home' }
        case AccountType.blog:
          return { type: 'icon', name: 'mdi:document' }
        case AccountType.twitter:
          return { type: 'icon', name: 'mdi:twitter' }
        case AccountType.facebook:
          return { type: 'icon', name: 'mdi:facebook' }
        case AccountType.pixiv:
          return { type: 'icon', name: 'simple-icons:pixiv' }
        case AccountType.github:
          return { type: 'icon', name: 'mdi:github' }
        case AccountType.qiita:
          return { type: 'icon', name: 'simple-icons:qiita' }
        case AccountType.atcoder:
          return { type: 'img', path: AtcoderImgPath }
        case AccountType.soundcloud:
          return { type: 'icon', name: 'mdi:soundcloud' }
      }
    })
    const styles = computed(() => ({
      height: `${props.size}px`,
      width: `${props.size}px`
    }))
    return { icon, styles }
  }
})
</script>
