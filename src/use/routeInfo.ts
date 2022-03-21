import { computed, ComputedRef } from 'vue'

interface routeinfo {
  icon: string
  description: string
}

const routes: { [key: string]: routeinfo } = {
  Top: { icon: 'mdi:apps', description: 'ポートフォリオの設定を変更します' },
  Profile: {
    icon: 'mdi:account-circle-outline',
    description: '掲載するアカウントや自己紹介を編集します'
  },
  Events: {
    icon: 'mdi:calendar',
    description: '講習会など、イベントの公開状態を設定します'
  },
  Contests: {
    icon: 'mdi:trophy-outline',
    description: '出場した大会を追加・編集します'
  },
  Projects: {
    icon: 'mdi:clipboard-file-outline',
    description: 'プロジェクトの期間や説明文を編集します'
  }
}

const useRouteInfo = (name: string): ComputedRef<routeinfo> => {
  const message = computed(() => getMessage(name))
  return message
}

const getMessage = (name: string): routeinfo => {
  const messgae = routes[name]
  if (messgae == null)
    return { icon: 'eos-icons:bubble-loading', description: 'Loading' }
  return messgae
}

export default useRouteInfo
