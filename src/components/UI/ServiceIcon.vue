<template>
  <icon
    v-if="icon.type === 'icon'"
    :name="icon.name"
    :size="size"
    :data-icon-name="icon.name"
    :class="$style.icon"
  />
  <img v-else-if="icon.type === 'img'" :src="icon.path" :style="styles" />
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
      type: Number as PropType<AccountType>,
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

<style lang="scss" module>
.icon {
  &[data-icon-name='mdi:twitter'] {
    color: #1da1f2;
  }
  &[data-icon-name='mdi:facebook'] {
    color: #4267b2;
  }
  &[data-icon-name='simple-icons:pixiv'] {
    color: #0096fa;
  }
  &[data-icon-name='mdi:github'] {
    color: #171515;
  }
  &[data-icon-name='simple-icons:qiita'] {
    color: #55c500;
  }
  &[data-icon-name='mdi:soundcloud'] {
    color: #f26f23;
  }
}
</style>
