<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageInfoPanels from '/@/components/Index/PageInfoPanels.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
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
  </page-container>
</template>

<style lang="scss" module>
.header {
  margin-bottom: 2rem;
}
</style>
