<template>
  <main :class="$style.container">
    <slot />
  </main>
</template>

<style lang="scss" module>
.container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 4rem 3rem 3rem;
  overflow-x: auto;
}

@media (width <= 768px) {
  .container {
    padding: 2rem 1.25rem;
  }
}
</style>
