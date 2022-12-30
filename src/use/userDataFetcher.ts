import { AxiosResponse } from 'axios'
import { ref, Ref, watchEffect } from 'vue'
import { FetcherState } from './fetcher'

const useUserDataFetcher = <T>(
  userId: Ref<string>,
  fetch: (userId: string) => Promise<AxiosResponse<T>>
): { data: Ref<T | undefined>; fetcherState: Ref<FetcherState> } => {
  const userData = ref<T>()
  const state = ref<FetcherState>('loading')
  watchEffect(async () => {
    try {
      userData.value = (await fetch(userId.value)).data
      state.value = 'loaded'
    } catch (e) {
      state.value = 'error'
      // eslint-disable-next-line no-console
      console.error(e)
    }
  })
  return { data: userData, fetcherState: state }
}

export default useUserDataFetcher
