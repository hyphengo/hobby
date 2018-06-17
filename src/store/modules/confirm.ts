const ActionType = {
  SET_CONFIRM_INIT: 'SET_CONFIRM_INIT',
}

type StateType = {
  init?: boolean;
}

const state: StateType = {
  init: false,
}

const mutations = {
  [ActionType.SET_CONFIRM_INIT](state: StateType, is: boolean) {
    state.init = is
  },
}

const actions = {
  setInit({ commit, dispatch }, is: number) {
    commit(ActionType.SET_CONFIRM_INIT, is)
  },
}

const getters = {
  init: (state: StateType) => state.init,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
