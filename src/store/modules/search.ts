interface StateType {
  text?: string;
}

const ActionType = {
  SET_TEXT: 'SET_TEXT',
  CLEAR_TEXT: 'CLEAR_TEXT'
}

const state = {
  text: '',
}

const mutations = {
  [ActionType.SET_TEXT](state: StateType, payload: string) {
    state.text = payload
  },
  [ActionType.CLEAR_TEXT](state: StateType) {
    state.text = ''
  },
}

const actions = {
  setText({ commit }, text: any) {
    commit(ActionType.SET_TEXT, text)
  },
  clearText({ commit }) {
    commit(ActionType.CLEAR_TEXT)
  }
}

const getters = {
  text: (state: StateType) => state.text,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
