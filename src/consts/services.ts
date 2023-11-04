import { deepFreeze } from '/@/lib/deepFreeze'
import { AccountType } from '/@/lib/apis'

export interface Service<Type extends AccountType = AccountType> {
  icon: string
  type: Type
}

export interface ServiceWithName<Type extends AccountType = AccountType>
  extends Service<Type> {
  name: ServiceName
}

export const serviceTypeToNameMap = Object.freeze({
  [AccountType.homepage]: 'HomePage',
  [AccountType.blog]: 'Blog',
  [AccountType.twitter]: 'Twitter',
  [AccountType.facebook]: 'Facebook',
  [AccountType.pixiv]: 'pixiv',
  [AccountType.github]: 'Github',
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
  Twitter: {
    icon: 'mdi:twitter',
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
  Github: {
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
    icon: 'atcoder', //アイコンは保留
    type: AccountType.atcoder
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
  }
}) satisfies ServiceRecord

export const serviceArray: readonly ServiceWithName[] = Object.entries(
  services
).map(([name, service]) => ({
  ...service,
  name: name as ServiceName
}))

export const serviceNameToType = (name: ServiceName): AccountType => {
  return services[name].type
}
export const hasIdService = (type: AccountType) =>
  ![AccountType.homepage, AccountType.blog].includes(type)

export const hasAtmarkService = (type: AccountType) =>
  [
    AccountType.twitter,
    AccountType.facebook,
    AccountType.pixiv,
    AccountType.qiita,
    AccountType.github
  ].includes(type)
