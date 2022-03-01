import { ref, Ref } from 'vue'

export type FetcherState = 'loading' | 'loaded' | 'error'

/**
 * @param value この値がnullでなくなったときに正常に取得できたとする
 * @param fetchFunc 返り値がTである必要はないが基本的には一致する必要があるので指定してる。
 *                  もし一致しない場合で利用する場合はas unknown as Tすること
 */
const useFetcher = <T>(
  value: Readonly<Ref<T | null>>,
  fetchFunc: () => Promise<T>
): { fetcherState: Ref<FetcherState> } => {
  const isLoadedBeforeInit = value.value !== null
  const state = ref<FetcherState>('loaded')

  if (isLoadedBeforeInit) {
    // 取得済み
    return { fetcherState: state }
  }

  // キャッシュがなかったので取得する
  ;(async () => {
    state.value = 'loading'
    try {
      await fetchFunc()
      state.value = 'loaded'
    } catch (e) {
      state.value = 'error'

      // eslint-disable-next-line no-console
      console.error(e)
    }
  })()

  return { fetcherState: state }
}

export default useFetcher
