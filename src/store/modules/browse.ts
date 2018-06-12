interface StateType {
  active?: string;
  type?: boolean;
}

const ActionType = {
  SET_ACTIVE: 'SET_ACTIVE',
  SET_TYPE: 'SET_TYPE'
}

const state = {
  active: null,
  type: false,
}

const mutations = {
  [ActionType.SET_ACTIVE](state: StateType, payload: string) {
    state.active = payload
  },
  [ActionType.SET_TYPE](state: StateType, payload: boolean) {
    state.type = payload
  },
}

const actions = {
  setActive({ commit }, active: any) {
    commit(ActionType.SET_ACTIVE, active)
  },
  setType({ commit }, type: any) {
    commit(ActionType.SET_TYPE, type)
  }
}

const getters = {
  active: (state: StateType) => state.active,
  type: (state: StateType) => state.type,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
