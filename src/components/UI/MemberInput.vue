<script lang="ts" setup>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import { computed, nextTick, ref, watchEffect } from 'vue'
import apis, { User } from '/@/lib/apis'
import UserIcon from './UserIcon.vue'

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
const users = ref<User[]>([])
watchEffect(async () => {
  const res = await apis.getUsers()
  if (res.status === 200) {
    users.value = res.data
  }
})
const filtered = computed(() =>
  users.value.filter(user => user.name.includes(search.value))
)
const options = computed(() => filtered.value.slice(0, limit.value))
const hasNextPage = computed(() => filtered.value.length > options.value.length)

const onSearch = (v: string) => {
  search.value = v
}

const infiniteScroll = async (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0]
  if (entry !== undefined && entry.isIntersecting) {
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
    multiple
    @open="onOpen"
    @close="onClose"
    @search="onSearch"
  >
    <template #option="{ name }">
      <li :class="$style.item">
        <user-icon :name="name" />
        <p>{{ name }}</p>
      </li>
    </template>
    <template #list-footer>
      <li v-if="hasNextPage" ref="footerRef">Loading...</li>
    </template>
    <template #no-options>
      <p>ユーザーが見つかりません</p>
    </template>
  </v-select>
</template>

<style lang="scss" module>
.item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 2rem;
}
</style>
