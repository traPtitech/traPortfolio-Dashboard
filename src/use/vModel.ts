import { computed, WritableComputedRef } from 'vue'

export const useModelSyncer = <
  P,
  K extends keyof P & string,
  E extends (n: `update:${K}`, val: P[K]) => void
>(
  props: P,
  emit: E,
  key: K,
  onUpdate?: (val: P[K]) => void
): WritableComputedRef<P[K]> => {
  const value = computed({
    get: () => props[key],
    set: v => {
      onUpdate?.(v)
      emit(`update:${key}` as const, v)
    }
  })
  return value
}

export const useModelValueSyncer = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends { modelValue: any },
  E extends (n: `update:modelValue`, val: P['modelValue']) => void
>(
  props: P,
  emit: E,
  onUpdate?: (val: P['modelValue']) => void
): WritableComputedRef<P['modelValue']> => {
  return useModelSyncer(props, emit, 'modelValue', onUpdate)
}
