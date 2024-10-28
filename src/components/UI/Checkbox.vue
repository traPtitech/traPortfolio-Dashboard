<script lang="ts" setup>
const model = defineModel<boolean>({ required: true })
</script>

<template>
  <input
    v-model="model"
    type="checkbox"
    :class="$style.input"
  />
</template>

<style lang="scss" module>
.input {
  position: relative;
  cursor: pointer;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid black;
  border-radius: 2px;

  &:checked:before {
    content: url('/icons/check.svg');
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
