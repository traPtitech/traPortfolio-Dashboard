<template>
  <li :class="$style.outer">
    <router-link :to="path" :class="$style.link">
      <div :class="$style.container">
        <icon :name="icon" :class="$style.icon" size="72" />
        <div>
          <h2 :class="$style.name">{{ name }}</h2>
          <p :class="$style.detail">{{ detail }}</p>
        </div>
      </div>
    </router-link>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../UI/Icon.vue'
export default defineComponent({
  name: 'PageInfoPanel',
  components: {
    Icon
  },
  props: {
    name: {
      type: String,
      required: true
    },
    detail: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.link {
  display: block;
  text-decoration: none;
}

.container {
  display: flex;
  align-items: center;
  border: 1px solid $color-primary-text;
  color: $color-secondary-text;
}

.icon {
  display: flex;
  color: $color-secondary;
}

.name {
  font-size: 1.25rem;
}

.detail {
  font-size: 0.875rem;
}

.outer {
  width: 21rem;
  padding-right: 1rem;
  @media (min-width: 41rem) {
    width: 50%;
  }
  margin-bottom: 1rem;
}
</style>
