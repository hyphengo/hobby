
const ActionType = {
  SET_LOCATION: 'SET_LOCATION',
}

type StateType = {
  location?: boolean;
}

const state: StateType = {
  location: false,
}

const mutations = {
  // 设置是否已经定过位
  [ActionType.SET_LOCATION](state: StateType) {
    state.location = true
  },
}

const actions = {
  setLocation({ commit, dispatch }) {
    commit(ActionType.SET_LOCATION)
  },
}

const getters = {
  location: (state: StateType) => state.location,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
