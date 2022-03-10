<template>
  <ol :class="$style.list">
    <page-info-panel
      v-for="page in pages"
      :key="page.name"
      :name="page.name"
      :detail="page.detail"
      :icon="page.icon"
      :path="page.path"
    />
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageInfoPanel from './PageInfoPanel.vue'

interface Page {
  name: string
  detail: string
  icon: string
  path: string
}

const pages: Page[] = [
  {
    name: 'Profile',
    detail: '掲載するアカウントや自己紹介を編集します',
    icon: 'mdi:account-circle-outline',
    path: '/user'
  },
  {
    name: 'Events',
    detail: '講習会など、イベントの公開状態を設定します',
    icon: 'mdi:calendar',
    path: '/events'
  },
  {
    name: 'Contests',
    detail: '出場した大会を追加・編集します',
    icon: 'mdi:trophy-outline',
    path: '/contests'
  },
  {
    name: 'Projects',
    detail: 'プロジェクトの期間や説明文を編集します',
    icon: 'mdi:clipboard-file-outline',
    path: '/projects'
  }
]

export default defineComponent({
  name: 'PageGrid',
  components: { PageInfoPanel },
  setup() {
    return { pages }
  }
})
</script>

<style lang="scss" module>
.list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}
</style>
