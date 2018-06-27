const ActionType = {
  SET_CONFIRM_INIT: 'SET_CONFIRM_INIT',
  CHANG_PHONE: 'CHANG_PHONE',
  CHANGE_MEMO: 'CHANGE_MEMO',
  CLEAR: 'CLEAR',
}

type StateType = {
  init?: boolean;
  phone?: any;
  memo?: any;
}

const state: StateType = {
  init: false,
  phone: '',
  memo: '',
}

const mutations = {
  [ActionType.SET_CONFIRM_INIT](state: StateType, is: boolean) {
    state.init = is
  },
  [ActionType.CHANG_PHONE](state: StateType, phone: number) {
    state.phone = phone
  },
  [ActionType.CHANGE_MEMO](state: StateType, memo: any) {
    state.memo = memo
  },
  [ActionType.CLEAR](state: StateType) {
    state.phone = ''
    state.memo = ''
  }
}

const actions = {
  setInit({ commit, dispatch }, is: number) {
    commit(ActionType.SET_CONFIRM_INIT, is)
  },
  changePhone({ commit }, phone: number) {
    commit(ActionType.CHANG_PHONE, phone)
  },
  changeMemo({ commit }, memo: any) {
    commit(ActionType.CHANGE_MEMO, memo)
  },
  clear({ commit }) {
    commit(ActionType.CLEAR)
  }
}

const getters = {
  init: (state: StateType) => state.init,
  phone: (state: StateType) => state.phone,
  memo: (state: StateType) => state.memo,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
