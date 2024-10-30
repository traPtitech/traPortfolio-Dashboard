<template>
  <footer :class="$style.container">
    <img
      src="/@/assets/traP_logo_full_white.svg"
      :class="$style.logo"
    />
  </footer>
</template>

<style lang="scss" module>
.container {
  padding: 1.5rem 3rem;
  color: $color-background;
  background-color: $color-text;
  text-align: right;
  @media (max-aspect-ratio: 1/2) {
    text-align: center;
  }
}
.logo {
  max-width: 20rem;
}
.copyright {
  font-size: 0.8rem;
}
</style>
