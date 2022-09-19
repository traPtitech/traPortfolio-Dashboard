import { computed, ComputedRef, Ref } from 'vue'
import { AccountType } from '../lib/apis'

type Service = {
  type: number
  name: string
}
export const services: Service[] = [
  { type: 0, name: 'Home Page' },
  { type: 1, name: 'Blog' },
  { type: 2, name: 'Twitter' },
  { type: 3, name: 'Facebook' },
  { type: 4, name: 'pixiv' },
  { type: 5, name: 'Github' },
  { type: 6, name: 'Qiita' },
  { type: 7, name: 'AtCoder' },
  { type: 8, name: 'SoundCloud' }
]

const useServiceInfo = (accountType: Ref<AccountType>): ComputedRef<string> =>
  computed(() => services[accountType.value]?.name ?? 'loading')

export default useServiceInfo
