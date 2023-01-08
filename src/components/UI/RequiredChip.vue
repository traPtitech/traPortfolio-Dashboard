<template>
  <div :class="$style.requiredChip">必須</div>
</template>

<style lang="scss" module>
.requiredChip {
  display: inline-block;

  border-radius: 8px;
  padding: 0 0.5rem;
  background-color: $color-warning;

  color: $color-primary-text;
  font-size: 0.75rem;
}
</style>
