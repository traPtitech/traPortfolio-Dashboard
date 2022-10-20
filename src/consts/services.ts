import type { AccountType } from '/@/lib/apis'

export type Service = Record<
  AccountType,
  {
    name: string
    icon: string
  }
>

export const services: Service = {
  0: {
    name: 'HomePage',
    icon: 'mdi:home'
  },
  1: {
    name: 'Blog',
    icon: 'mdi:post-outline'
  },
  2: {
    name: 'Twitter',
    icon: 'mdi:twitter'
  },
  3: {
    name: 'Facebook',
    icon: 'mdi:facebook'
  },
  4: {
    name: 'pixiv',
    icon: 'simple-icons:pixiv'
  },
  5: {
    name: 'Github',
    icon: 'mdi:github'
  },
  6: {
    name: 'Qiita',
    icon: 'simple-icons:qiita'
  },
  7: {
    name: 'Zenn',
    icon: 'simple-icons:zenn'
  },
  8: {
    name: 'AtCoder',
    icon: 'atcoder' //アイコンは保留
  },
  9: {
    name: 'SoundCloud',
    icon: 'mdi:soundcloud'
  },
  10: {
    name: 'HackTheBox',
    icon: 'simple-icons:hackthebox'
  },
  11: {
    name: 'CTFtime',
    icon: 'ctftime' //アイコンは保留
  }
}
