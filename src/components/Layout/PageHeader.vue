<script lang="ts" setup>
import SearchInput from '/@/components/UI/SearchInput.vue'
import Icon from '/@/components/UI/Icon.vue'
import { storeToRefs } from 'pinia'
import { useResponsiveStore } from '/@/store/responsive'
import apis from '/@/lib/apis'
import { useToast } from 'vue-toastification'

interface Props {
  isOpenNavigationBar: boolean
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggleNavigationBar'): void
}>()

const toast = useToast()
const { isMobile } = storeToRefs(useResponsiveStore())

const handleSyncUsers = async () => {
  if (!confirm('ユーザーとグループ情報を同期します')) return
  try {
    await apis.syncUsers()
    toast.success('ユーザーとグループ情報を同期しました')
  } catch {
    toast.error('ユーザーとグループ情報の同期に失敗しました')
  }
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.leftContainer">
      <button v-if="isMobile" @click="emit('toggleNavigationBar')">
        <icon name="mdi:menu" />
      </button>
      <router-link to="/">
        <img
          src="/@/assets/traP_logo_blue.svg"
          alt="traP"
          width="343"
          height="48"
        />
      </router-link>
    </div>
    <div :class="$style.rightContainer">
      <button @click="handleSyncUsers">
        <icon name="mdi:sync" :class="$style.syncButton" />
      </button>
      <search-input />
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  height: 5rem;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.1rem $color-secondary;
}

.leftContainer {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rightContainer {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.syncButton {
  color: $color-secondary;
  transition: 0.2s all ease-in-out;
  &:hover {
    color: $color-primary;
  }
}

@media (width <= 768px) {
  .container {
    padding: 0 1rem;
  }
}
</style>
