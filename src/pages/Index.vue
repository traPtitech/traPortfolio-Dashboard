<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageInfoPanels from '/@/components/Index/PageInfoPanels.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import AutoResizeTextArea from '../components/UI/AutoResizeTextArea.vue'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:apps"
      :header-texts="[{ title: 'Top', url: '/' }]"
      detail="ポートフォリオの設定を変更します"
      :class="$style.header"
    />
    <page-info-panels />
    <auto-resize-text-area v-model="value" />
  </page-container>
</template>

<style lang="scss" module>
.header {
  margin: 4rem 0 2rem;
}
</style>
