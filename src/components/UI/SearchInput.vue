<template>
  <div :class="[$style.inputWrapper, size === 'large' ? $style.large : '']">
    <icon name="mdi:magnify" :size="iconSize" :class="$style.icon" />
    <input
      v-model="input"
      type="text"
      :placeholder="placeholder"
      :class="$style.input"
      @keypress.prevent.enter.exact="submit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'SearchInput',
  components: {
    Icon
  },
  props: {
    size: {
      type: String as PropType<'large' | 'normal'>,
      default: 'normal'
    },
    placeholder: {
      type: String,
      default: '検索'
    }
  },
  setup(props) {
    const router = useRouter()
    const input = ref('')
    const submit = () => {
      // 検索結果ページへ遷移
      router.push({ name: 'UserSearch', query: { q: input.value } })
    }
    const iconSize = computed(() => {
      if (props.size === 'large') return 36
      else if (props.size === 'normal') return 20
      else {
        const _exhaustiveCheck: never = props.size
        return _exhaustiveCheck
      }
    })
    return { input, submit, iconSize }
  }
})
</script>

<style lang="scss" module>
.inputWrapper {
  display: flex;
  padding: 0.2rem;
  border: 2px solid $color-secondary;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1em;
  align-items: center;
}
.input {
  outline: none;
  width: 100%;
  height: 1em;
  color: $color-secondary-text;
}
.icon {
  margin: 0 0.2rem;
  color: $color-secondary-text;
}

.large {
  font-size: 24px;
}
</style>
