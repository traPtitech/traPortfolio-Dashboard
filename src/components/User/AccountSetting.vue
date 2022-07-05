<template>
  <div :class="$style.container">
    <external-link :class="$style.accountId">
      <p>@{{ account.id }}</p>
    </external-link>
    <div :class="$style.box">
      <check-box v-model="state" label="言及を許可する" />
      <p :class="$style.button">削除</p>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'
import { Account } from '/@/lib/apis'
import ExternalLink from '../UI/ExternalLink.vue'
import CheckBox from '../UI/CheckBox.vue'

export default defineComponent({
  components: { ExternalLink, CheckBox },
  props: {
    account: {
      type: Object as PropType<Account>,
      default: undefined
    }
  },
  setup() {
    const state = ref<boolean>(false)
    return { state }
  }
})
</script>

<style lang="scss" module>
.accountId {
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
}
.prPermitted {
  margin-left: 3px;
  margin-bottom: 0.25rem;
}
.container {
  border-bottom: 1px solid $color-background-dim;
  padding-left: 2.5rem;
}

.box {
  display: flex;
}

.button {
  margin-left: auto;
}
</style>
