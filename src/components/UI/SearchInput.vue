<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { useRouter } from 'vue-router'

interface Props {
  size: 'large' | 'normal'
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  placeholder: '検索'
})

const router = useRouter()

const input = ref('')

const submit = () => {
  // 検索結果ページへ遷移
  router.push({ name: 'UserSearch', query: { q: input.value } })
}

const iconSize = computed(() => {
  switch (props.size) {
    case 'large':
      return 36
    case 'normal':
      return 20
    default:
      throw new Error(`Invalid size: ${props.size satisfies never}`)
  }
})
</script>

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
  font-size: 1.5rem;
}
</style>
