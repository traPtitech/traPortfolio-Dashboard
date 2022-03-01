import { useRoute, LocationQueryValue } from 'vue-router'
import { computed, ComputedRef } from 'vue'

const toStringIfArray = (
  s: LocationQueryValue | undefined | LocationQueryValue[]
) => (Array.isArray(s) ? s[0] : s)

/**
 * @param queryName - 取得するquery
 * @returns 存在しない場合はundefind
 */
const useQuery = (queryName: string): ComputedRef<string | undefined> => {
  const route = useRoute()
  return computed(() => toStringIfArray(route.query[queryName]) ?? undefined)
}

export default useQuery
