<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageInfoPanels from '/@/components/Index/PageInfoPanels.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:apps"
      :title="['Top']"
      detail="ポートフォリオの設定を変更します"
    />
    <page-info-panels />
  </page-container>
</template>
