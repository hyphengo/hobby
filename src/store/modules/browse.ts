interface StateType {
  active?: string;
}

const ActionType = {
  SET_ACTIVE: 'SET_ACTIVE',
}

const state = {
  active: null,
}

const mutations = {
  [ActionType.SET_ACTIVE](state: StateType, payload: string) {
    state.active = payload
  },
}

const actions = {
  setActive({ commit }, active: any) {
    commit(ActionType.SET_ACTIVE, active)
  }
}

const getters = {
  active: (state: StateType) => state.active,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
