<script lang="ts" setup>
import { ref } from 'vue'
import ContentHeader from '../components/Layout/ContentHeader.vue'
import PageContainer from '../components/Layout/PageContainer.vue'
import BaseButton from '../components/UI/BaseButton.vue'
import FormInput from '../components/UI/FormInput.vue'

const searchQuery = ref('')
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:clipboard-file-outline"
      :header-texts="[{ title: 'Projects', url: '/' }]"
      detail="プロジェクトを変更します"
      :class="$style.header"
    />
    <div :class="$style.searchFormContainer">
      <div :class="$style.searchForm">
        <p :class="$style.body2">検索</p>
        <form-input
          v-model="searchQuery"
          placeholder="プロジェクト名"
          icon="magnify"
        />
      </div>
      <div>
        <p :class="$style.body2">プロジェクト作成</p>
        <!-- TODO: Contestsの作成が終わったら、それをマージ。 -->
        <base-button type="primary" icon="mdi:clipboard-file"> New</base-button>
      </div>
    </div>
  </page-container>
</template>

<style lang="scss" module>
.header {
  margin: 4rem 0 2rem;
}

.searchFormContainer {
  display: flex;
  gap: 0.5rem;
}

.searchForm {
  flex-grow: 1;
}

.body2 {
  font-size: 0.875rem;
  color: $color-secondary;
}
</style>
