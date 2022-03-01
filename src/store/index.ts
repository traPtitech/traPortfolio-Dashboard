import { createDirectStore } from 'direct-vuex'
import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

const directStore = createDirectStore({
  state,
  getters,
  mutations,
  actions
})
export const { rootGetterContext, rootActionContext } = directStore

const { store } = directStore

export default store.original

export type Store = typeof store
export const useStore = (): Store => store
