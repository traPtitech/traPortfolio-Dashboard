import { computed, ComputedRef, Ref } from 'vue'

interface routeinfo {
  name: string
  path: string
  icon: string
  description: string
}

export const routes: routeinfo[] = [
  {
    name: 'Top',
    path: '/',
    icon: 'mdi:apps',
    description: 'ポートフォリオの設定を変更します'
  },
  {
    name: 'Profile',
    path: '/users',
    icon: 'mdi:account-circle-outline',
    description: '掲載するアカウントや自己紹介を編集します'
  },
  {
    name: 'Events',
    path: '/events',
    icon: 'mdi:calendar',
    description: '講習会など、イベントの公開状態を設定します'
  },
  {
    name: 'Contests',
    path: '/contests',
    icon: 'mdi:trophy-outline',
    description: '出場した大会を追加・編集します'
  },
  {
    name: 'Projects',
    path: '/projects',
    icon: 'mdi:clipboard-file-outline',
    description: 'プロジェクトの期間や説明文を編集します'
  }
]

const getMessage = (name: string): routeinfo => {
  for (const route of routes) {
    if (route.name === name) return route
  }
  // Default Value
  return {
    name: 'Loading',
    path: '',
    icon: 'eos-icons:bubble-loading',
    description: 'Loading'
  }
}

const useRouteInfo = (name: Ref<string>): ComputedRef<routeinfo> => {
  const message = computed(() => getMessage(name.value))
  return message
}

export default useRouteInfo
