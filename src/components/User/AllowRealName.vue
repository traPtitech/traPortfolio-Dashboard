<template>
  <div>
    <h2 :class="$style.title">本名を許可する</h2>
    <div :class="$style.container">
      <p :class="$style.realName">{{ $props.userDetail?.realName }}</p>
      <toggle v-model="state" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import Toggle from '../UI/Toggle.vue'
import { UserDetail } from '/@/lib/apis'

export default defineComponent({
  components: { Toggle },
  props: {
    userDetail: {
      type: Object as PropType<UserDetail>,
      default: undefined
    }
  },
  setup() {
    const state = ref<boolean>()
    return { state }
  }
})
</script>

<style lang="scss" module>
.title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.realName {
  font-size: 1.25rem;
  margin-right: 2rem;
  text-align: center;
}

.container {
  display: flex;
  align-items: center;
}
</style>
