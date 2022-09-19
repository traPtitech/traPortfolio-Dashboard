<template>
  <dialog-template @close="close">
    <div :class="$style.container">
      <h1 :class="$style.header">アカウントの追加</h1>
      <div :class="$style.content">
        <p>サービス名</p>
        <p>id</p>
        <p>リンク</p>
        <check-box v-model="checked" />
      </div>
      <normal-buttom color="primary" label="追加" :class="$style.button" />
    </div>
  </dialog-template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CheckBox from '../../UI/CheckBox.vue'
import DialogTemplate from '../../UI/DialogTemplate.vue'
import NormalButtom from '../../UI/NormalButtom.vue'

export default defineComponent({
  name: 'AccountForm',
  components: { DialogTemplate, CheckBox, NormalButtom },
  emits: ['close'],
  setup(props, { emit }) {
    const checked = ref<boolean>(false)
    const close = () => emit('close')
    return { checked, close }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  gap: 1rem;
}
.header {
  color: $color-primary;
  font-size: 1.25rem;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.button {
  margin: 0 auto;
}
</style>
