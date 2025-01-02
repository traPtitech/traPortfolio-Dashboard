<script lang="ts" setup>
import AIcon from '/@/components/UI/AIcon.vue'
</script>

<template>
  <div :class="$style.container">
    <p>traPortfolio</p>
    <a
      href="https://wiki.trap.jp/services/traPortfolio"
      target="_blank"
      rel="noopener noreferrer"
    >
      <a-icon
        name="mdi:help"
        :class="$style.icon"
      />
    </a>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $color-secondary;
  padding: 0 1rem;
}

.icon {
  cursor: pointer;
  color: $color-secondary;
  &:hover {
    opacity: 0.8;
  }
}
</style>
