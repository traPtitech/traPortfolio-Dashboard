import { deepFreeze } from '/@/lib/deepFreeze'
import { AccountType } from '/@/lib/apis'
import AtCoder from '/@/assets/AtCoder.png'

export interface Service<Type extends AccountType = AccountType> {
  icon: string
  type: Type
  notIcon?: boolean
}

export interface ServiceWithName<Type extends AccountType = AccountType>
  extends Service<Type> {
  name: ServiceName
}

export const serviceTypeToNameMap = Object.freeze({
  [AccountType.homepage]: 'HomePage',
  [AccountType.blog]: 'Blog',
  [AccountType.twitter]: 'X',
  [AccountType.facebook]: 'Facebook',
  [AccountType.pixiv]: 'pixiv',
  [AccountType.github]: 'GitHub',
  [AccountType.qiita]: 'Qiita',
  [AccountType.zenn]: 'Zenn',
  [AccountType.atcoder]: 'AtCoder',
  [AccountType.soundcloud]: 'SoundCloud',
  [AccountType.hackthebox]: 'HackTheBox',
  [AccountType.ctftime]: 'CTFtime',
  [AccountType.bluesky]: 'Bluesky'
}) satisfies Record<AccountType, string>

type ServiceTypeToName = typeof serviceTypeToNameMap
type ServiceName = ServiceTypeToName[keyof ServiceTypeToName]
type ServiceRecord = {
  [Type in AccountType as ServiceTypeToName[Type]]: Service<Type>
}

export const services = deepFreeze({
  HomePage: {
    icon: 'mdi:home',
    type: AccountType.homepage
  },
  Blog: {
    icon: 'mdi:post-outline',
    type: AccountType.blog
  },
  X: {
    icon: 'ph:x-logo',
    type: AccountType.twitter
  },
  Facebook: {
    icon: 'mdi:facebook',
    type: AccountType.facebook
  },
  pixiv: {
    icon: 'simple-icons:pixiv',
    type: AccountType.pixiv
  },
  GitHub: {
    icon: 'mdi:github',
    type: AccountType.github
  },
  Qiita: {
    icon: 'simple-icons:qiita',
    type: AccountType.qiita
  },
  Zenn: {
    icon: 'simple-icons:zenn',
    type: AccountType.zenn
  },
  AtCoder: {
    icon: AtCoder,
    type: AccountType.atcoder,
    notIcon: true
  },
  SoundCloud: {
    icon: 'mdi:soundcloud',
    type: AccountType.soundcloud
  },
  HackTheBox: {
    icon: 'simple-icons:hackthebox',
    type: AccountType.hackthebox
  },
  CTFtime: {
    icon: 'ctftime', //アイコンは保留
    type: AccountType.ctftime
  },
  Bluesky: {
    icon: 'simple-icons:bluesky',
    type: AccountType.bluesky
  }
}) satisfies ServiceRecord

export const serviceArray: readonly ServiceWithName[] = Object.entries(
  services
).map(([name, service]) => ({
  ...service,
  name: name as keyof typeof services
}))

export const serviceNameToType = (name: ServiceName): AccountType => {
  return services[name].type
}
export const hasIdService = (type: AccountType) => {
  const array: AccountType[] = [AccountType.homepage, AccountType.blog]
  return !array.includes(type)
}

export const hasAtmarkService = (type: AccountType) => {
  const array: AccountType[] = [
    AccountType.twitter,
    AccountType.facebook,
    AccountType.pixiv,
    AccountType.qiita,
    AccountType.github,
    AccountType.bluesky
  ]
  return array.includes(type)
}
