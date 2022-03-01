import { useRoute } from 'vue-router'
import { computed, ComputedRef } from 'vue'

const toStringIfArray = (s: string | undefined | readonly string[]) =>
  Array.isArray(s) ? s[0] : s

/**
 * @param paramName - 取得するparam、存在しないものを取得しようとした場合、undefinedが返るので注意
 */
const useParam = (paramName: string): ComputedRef<string> => {
  const route = useRoute()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return computed(() => toStringIfArray(route.params[paramName])!)
}

export default useParam
