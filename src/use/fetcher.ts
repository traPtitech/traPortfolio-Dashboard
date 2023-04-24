import { AxiosResponse } from 'axios'
import { ref, Ref, watchEffect } from 'vue'

export type FetcherState = 'loading' | 'loaded' | 'error'

export const useDataFetcher = <T>(
  fetch: () => Promise<AxiosResponse<T>>
): { data: Ref<T | undefined>; fetcherState: Ref<FetcherState> } => {
  const data = ref<T>()
  const state = ref<FetcherState>('loading')
  watchEffect(async () => {
    try {
      data.value = (await fetch()).data
      state.value = 'loaded'
    } catch (e) {
      state.value = 'error'
      // eslint-disable-next-line no-console
      console.error(e)
    }
  })
  return { data: data, fetcherState: state }
}
