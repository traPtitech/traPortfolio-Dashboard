<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageInfoPanels from '/@/components/Index/PageInfoPanels.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import ConfirmModal from '/@/components/UI/ComfirmModal.vue'
</script>

<template>
  <confirm-modal />

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
  margin: 4rem 0 2rem;
}
</style>
