import { Service } from '/@/consts/services'

export const validateService = (service: Service | undefined) => {
  if (service === undefined) {
    return {
      name: 'Unknown',
      icon: 'mdi:help-circle'
    }
  }
  return service
}
