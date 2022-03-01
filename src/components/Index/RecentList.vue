<template>
  <section :class="$style.container">
    <section-title :class="$style.title">
      <span :class="$style.prefixTitle">最近の</span>
      <span>{{ title }}</span>
    </section-title>
    <div>
      <router-link
        v-for="item in listItem"
        :key="item.id"
        :to="`/${path}/${item.id}`"
        :class="$style.link"
      >
        <span :class="$style.name">{{ item.name }}</span>
      </router-link>
    </div>
    <router-link :to="`/${path}`" :class="$style.moreRead">
      <span :class="$style.name">もっと見る</span>
    </router-link>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Duration } from '/@/lib/apis'
import SectionTitle from '../Layout/SectionTitle.vue'

interface Item {
  id: string
  name: string
  duration: Duration
}

export default defineComponent({
  name: 'RecentList',
  components: {
    SectionTitle
  },
  props: {
    items: {
      type: Array as PropType<Item[]>,
      default: []
    },
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const listItem = computed(() => {
      if (!props.items) return []
      const li = props.items
      li.sort((a, b) => {
        if (a.duration.since > b.duration.since) {
          return -1
        } else {
          return 1
        }
      })
      return li.slice(0, 5)
    })
    return { listItem }
  }
})
</script>

<style lang="scss" module>
.link {
  display: block;
  margin: 0.5rem 1rem;
  text-decoration: none;
}
.name {
  font-size: 1.5rem;
  color: $color-text;
}
.title {
  color: $color-primary;
}
.prefix-title {
  font-size: 1.15rem;
}
.more-read {
  display: block;
  margin: 1rem 1rem;
  text-decoration: none;
  text-align: right;
  margin-top: auto;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
