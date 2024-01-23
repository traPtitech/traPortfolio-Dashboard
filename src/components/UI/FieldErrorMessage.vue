<template>
  <p :class="$style.container">
    <slot />
  </p>
</template>

<style module lang="scss">
.container {
  color: $color-warning;
  font-size: 0.75rem;
  padding: 0.5rem 0;
}
</style>
