const ActionType = {
  SET_CONFIRM_INIT: 'SET_CONFIRM_INIT',
  CHANG_PHONE: 'CHANG_PHONE',
  CLEAR_PHONE: 'CLEAR_PHONE',
}

type StateType = {
  init?: boolean;
  phone?: any;
}

const state: StateType = {
  init: false,
  phone: '',
}

const mutations = {
  [ActionType.SET_CONFIRM_INIT](state: StateType, is: boolean) {
    state.init = is
  },
  [ActionType.CHANG_PHONE](state: StateType, phone: number) {
    state.phone = phone
  },
  [ActionType.CLEAR_PHONE](state: StateType) {
    state.phone = ''
  }
}

const actions = {
  setInit({ commit, dispatch }, is: number) {
    commit(ActionType.SET_CONFIRM_INIT, is)
  },
  changePhone({ commit }, phone: number) {
    commit(ActionType.CHANG_PHONE, phone)
  },
  clearPhone({ commit }) {
    commit(ActionType.CLEAR_PHONE)
  }
}

const getters = {
  init: (state: StateType) => state.init,
  phone: (state: StateType) => state.phone,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
