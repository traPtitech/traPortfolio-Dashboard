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
.outer {
  width: 100%;
  @media (min-width: 52rem) {
    width: 50%;
    padding-right: 1rem;
  }
  margin-bottom: 1rem;
}

.link {
  display: block;
  text-decoration: none;
}

.container {
  display: flex;
  align-items: center;
  border: 1px solid $color-primary-text;
  border-radius: 6px;
  color: $color-secondary-text;

  transition: 0.2s all ease-in-out;
  &:hover {
    border-color: $color-primary;
    .icon {
      color: $color-primary;
    }
  }
}

.icon {
  display: flex;
  color: $color-secondary;
  margin: 0.75rem;
  transition: 0.2s all ease-in-out;
}

.name {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.detail {
  font-size: 0.875rem;
}
</style>
