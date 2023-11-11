<script lang="ts" setup>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import { computed, nextTick, onUnmounted, ref } from 'vue'
import { User } from '/@/lib/apis'
import { useUserStore } from '/@/store/user'
import UserIcon from '/@/components/UI/UserIcon.vue'

const userStore = useUserStore()
const users = await userStore.fetchUsers()

interface Props {
  modelValue: User[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: User[]): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const limit = ref(10)
const search = ref('')

const filtered = computed(
  () => users.filter(user => user.name.includes(search.value)) ?? []
)
const options = computed(() => filtered.value.slice(0, limit.value))
const hasNextPage = computed(() => filtered.value.length > options.value.length)

const onSearch = (v: string) => {
  search.value = v
}

const infiniteScroll = async (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0]
  if (entry?.isIntersecting) {
    const ul = (entry.target as HTMLUListElement).offsetParent
    const scrollTop = ul?.scrollTop ?? 0
    limit.value += 10

    await nextTick()
    if (ul !== null) {
      ul.scrollTop = scrollTop
    }
  }
}

const footerRef = ref<HTMLUListElement>()
const observer = new IntersectionObserver(infiniteScroll)
onUnmounted(() => {
  observer.disconnect()
})

const onOpen = async () => {
  if (!hasNextPage.value) return

  await nextTick()
  if (footerRef.value !== undefined) {
    observer.observe(footerRef.value)
  }
}
const onClose = () => {
  observer.disconnect()
}
</script>

<template>
  <v-select
    v-model="value"
    :options="options"
    placeholder="メンバー"
    label="name"
    :class="$style.select"
    class="select"
    multiple
    :close-on-select="false"
    deselect-from-dropdown
    @open="onOpen"
    @close="onClose"
    @search="onSearch"
  >
    <template #selected-option-container="{ option }">
      <p class="vs__selected">{{ option.name }},</p>
    </template>
    <template #option="{ name }">
      <div :class="$style.item">
        <user-icon :user-id="name" />
        <p>{{ name }}</p>
      </div>
    </template>
    <template #list-footer>
      <li v-if="hasNextPage" ref="footerRef">Loading...</li>
    </template>
    <template #no-options>
      <p>ユーザーが見つかりませんでした</p>
    </template>
  </v-select>
</template>

<style lang="scss" module>
.select {
  --vs-dropdown-option-padding: 4px 8px;
  --vs-search-input-placeholder-color: #{$color-secondary};
  --vs-border-color: #{$color-secondary};
  --vs-dropdown-option--active-bg: #{$color-background-dim};
  --vs-dropdown-option--active-color: #{$color-text};
  --vs-dropdown-option--deselect-bg: #{$color-background-dim};
  --vs-dropdown-option--deselect-color: #{$color-text};
  --vs-selected-border-style: none;
  --vs-selected-bg: transparent;
  --vs-selected-color: #{$color-text};
  --vs-controls-color: #{$color-secondary};
  &:focus-within {
    --vs-border-color: #{$color-primary};
  }
}

.item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 2rem;
  &[aria-selected='true'] {
    background-color: $color-background-dim;
  }
}

.select :global(.vs__selected-options) {
  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background-color: $color-secondary;
    mask: url('/icons/account.svg') no-repeat center center;
  }
  &:focus-within::before {
    background-color: $color-primary;
  }
}
.select :global(.vs__dropdown-option--selected) {
  background-color: $color-background-dim;
  &:hover {
    filter: brightness(0.95);
  }
}

.select :global(.vs__selected) {
  margin: 0 2px;
}

.select :global(.vs__search) {
  margin: 0 2px;
}

.select :global(.vs__dropdown-toggle) {
  padding: 8px;
}
</style>
