import { AccountType } from '/@/lib/apis'

interface Service {
  name: string
  icon: string
}
export interface ServiceWithType extends Service {
  type: AccountType
}

type ServiceRecord = Record<AccountType, Service>

export const services: ServiceRecord = {
  [AccountType.homepage]: {
    name: 'HomePage',
    icon: 'mdi:home'
  },
  [AccountType.blog]: {
    name: 'Blog',
    icon: 'mdi:post-outline'
  },
  [AccountType.twitter]: {
    name: 'Twitter',
    icon: 'mdi:twitter'
  },
  [AccountType.facebook]: {
    name: 'Facebook',
    icon: 'mdi:facebook'
  },
  [AccountType.pixiv]: {
    name: 'pixiv',
    icon: 'simple-icons:pixiv'
  },
  [AccountType.github]: {
    name: 'Github',
    icon: 'mdi:github'
  },
  [AccountType.qiita]: {
    name: 'Qiita',
    icon: 'simple-icons:qiita'
  },
  [AccountType.zenn]: {
    name: 'Zenn',
    icon: 'simple-icons:zenn'
  },
  [AccountType.atcoder]: {
    name: 'AtCoder',
    icon: 'atcoder' //アイコンは保留
  },
  [AccountType.soundcloud]: {
    name: 'SoundCloud',
    icon: 'mdi:soundcloud'
  },
  [AccountType.hackthebox]: {
    name: 'HackTheBox',
    icon: 'simple-icons:hackthebox'
  },
  [AccountType.ctftime]: {
    name: 'CTFtime',
    icon: 'ctftime' //アイコンは保留
  }
}

export const serviceArray: ServiceWithType[] = Object.entries(services).map(
  ([type, service]) => {
    if (isNaN(Number(type))) {
      throw new Error('Service type is not number')
    }
    return { ...service, type: Number(type) }
  }
)
