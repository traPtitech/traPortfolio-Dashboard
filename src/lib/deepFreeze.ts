export const deepFreeze = <const T extends object>(obj: T): T => {
  const propNames = Object.getOwnPropertyNames(obj)

  for (const name of propNames) {
    const value = obj[name as keyof typeof obj]

    if (value && typeof value === 'object') {
      deepFreeze(value as Record<string, unknown>)
    }
  }

  return Object.freeze(obj)
}
