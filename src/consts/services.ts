import { deepFreeze } from '/@/lib/deepFreeze'
import { AccountType } from '/@/lib/apis'
import AtCoder from '/@/assets/AtCoder.png'

export interface Service<Type extends AccountType = AccountType> {
  icon: string
  type: Type
  toUrl?: (id: string) => string
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
  [AccountType.ctftime]: 'CTFtime'
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
    type: AccountType.twitter,
    toUrl: (id: string) => `https://x.com/${id}`
  },
  Facebook: {
    icon: 'mdi:facebook',
    type: AccountType.facebook,
    toUrl: (id: string) => `https://www.facebook.com/${id}`
  },
  pixiv: {
    icon: 'simple-icons:pixiv',
    type: AccountType.pixiv,
    toUrl: (id: string) => `https://www.pixiv.net/users/${id}`
  },
  GitHub: {
    icon: 'mdi:github',
    type: AccountType.github,
    toUrl: (id: string) => `https://github.com/${id}`
  },
  Qiita: {
    icon: 'simple-icons:qiita',
    type: AccountType.qiita,
    toUrl: (id: string) => `https://qiita.com/${id}`
  },
  Zenn: {
    icon: 'simple-icons:zenn',
    type: AccountType.zenn,
    toUrl: (id: string) => `https://zenn.dev/${id}`
  },
  AtCoder: {
    icon: AtCoder,
    type: AccountType.atcoder,
    notIcon: true,
    toUrl: (id: string) => `https://atcoder.jp/users/${id}`
  },
  SoundCloud: {
    icon: 'mdi:soundcloud',
    type: AccountType.soundcloud,
    toUrl: (id: string) => `https://soundcloud.com/${id}`
  },
  HackTheBox: {
    icon: 'simple-icons:hackthebox',
    type: AccountType.hackthebox,
    toUrl: (id: string) => `https://www.hackthebox.com/profile/${id}`
  },
  CTFtime: {
    icon: 'ctftime', //アイコンは保留
    type: AccountType.ctftime,
    toUrl: (id: string) => `https://ctftime.org/user/${id}`
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

export const hasUrlGenerator = (type: AccountType): boolean => {
  return !!serviceArray.find(s => s.type === type)?.toUrl
}

export const generateUrlFromId = (type: AccountType, id: string): string => {
  const service = serviceArray.find(s => s.type === type)
  if (service?.toUrl) {
    return service.toUrl(id)
  }
  return ''
}

export const hasAtmarkService = (type: AccountType) => {
  const array: AccountType[] = [
    AccountType.twitter,
    AccountType.facebook,
    AccountType.pixiv,
    AccountType.qiita,
    AccountType.github
  ]
  return array.includes(type)
}
