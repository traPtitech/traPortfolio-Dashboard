<template>
  <div>
    <h2 :class="$style.title">自己紹介</h2>
    <text-area
      v-model="text"
      :class="$style.bio"
      placeholder="自己紹介がないようです！"
    />
  </div>
</template>

メモ : いい感じにemit してUser.vueに対してイベントを送信する

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import TextArea from '../UI/TextArea.vue'
import { UserDetail } from '/@/lib/apis'

export default defineComponent({
  components: { TextArea },
  props: {
    userDetail: {
      type: Object as PropType<UserDetail>,
      default: undefined
    }
  },
  setup(props) {
    const text = computed(() => props.userDetail?.bio ?? '')
    return { text }
  }
})
</script>

<style lang="scss" module>
.title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.bio {
  width: 100%;
  height: 8rem;
  border: 1px solid $color-primary-text;
  border-radius: 4px;
  padding: 8px 16px;
  resize: none;
}
</style>
