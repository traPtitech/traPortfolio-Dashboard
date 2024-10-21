<template>
  <footer :class="$style.container">
    <img src="/@/assets/traP_logo.svg" :class="$style.logo" />
    <div :class="$style.copyright">© 2015-2020 traP TokyoTech</div>
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
