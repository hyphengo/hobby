import ls from '@/util/localStorage'
import { TOKEN } from '@/constants'

const ActionType = {
  SET_TOKEN: 'SET_TOKEN',
  CLEAR_USER: 'CLEAR_USER',
  IS_AUTH: 'IS_AUTH',
  SET_REGISTRY: 'SET_REGISTRY'
}

type StateType = {
  token?: string | null;
  isAuth?: boolean;
  registry?: boolean;
}

const state: StateType = {
  token: null,
  isAuth: false,
  registry: false,
}

const mutations = {
  // token
  [ActionType.SET_TOKEN](state: StateType, token: string) {
    if (token) {
      ls.set(TOKEN, token)
      state.token = token
    }
  },
  // registry
  [ActionType.SET_REGISTRY](state: StateType, registry: boolean) {
    state.registry = registry
  },
  // Clear 所有数据
  [ActionType.CLEAR_USER](state: StateType) {
    state.token = null
    state.registry = false
    ls.remove(TOKEN)
  },
  // 是否登录
  [ActionType.IS_AUTH](state: StateType, isAuth: boolean) {
    state.isAuth = isAuth
  },
}

const actions = {
  setUser({ commit, dispatch }, data: any) {
    commit(ActionType.IS_AUTH, true)
    commit(ActionType.SET_TOKEN, data.token)
    commit(ActionType.SET_REGISTRY, data.registry)
  },
  clearAuth({ commit }) {
    commit(ActionType.CLEAR_USER)
    commit(ActionType.IS_AUTH, false)
  },
  setRegistry({ commit }) {
    commit(ActionType.SET_REGISTRY, false)
  },
  
}

const getters = {
  isAuth: (state: StateType) => state.isAuth,
  token: (state: StateType) => state.token,
  registry: (state: StateType) => state.registry,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
