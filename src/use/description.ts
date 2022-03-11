import { computed, ComputedRef } from 'vue'

const useDescription = (name: string): ComputedRef<string> => {
  const description: ComputedRef<string> = computed(() => {
    switch (name) {
      case 'Top':
        return 'ポートフォリオの設定を変更します'
      case 'Profile':
        return '掲載するアカウントや自己紹介を編集します'
      case 'Events':
        return '講習会など、イベントの公開状態を設定します'
      case 'Contests':
        return '出場した大会を追加・編集します'
      case 'Projects':
        return 'プロジェクトの期間や説明文を編集します'
      default:
        return 'Loading'
    }
  })
  return description
}

export default useDescription
