
const ActionType = {
  SET_CITY: 'SET_CITY',
  SET_COMMUNITY: 'SET_COMMUNITY',
  SET_EDIT_ADDRESS: 'SET_EDIT_ADDRESS',
}

type StateType = {
  city?: any;
  community?: any;
  addressInfo?: any;
}

const state: StateType = {
  city: {},
  community: {},
  addressInfo: {},
}

const mutations = {
  // 城市信息
  [ActionType.SET_CITY](state: StateType, city: any) {
    state.city = city
  },
  // 小区信息
  [ActionType.SET_COMMUNITY](state: StateType, community: any) {
    state.community = community
  },
  // 编辑地址时的地址信息
  [ActionType.SET_EDIT_ADDRESS](state: StateType, addressInfo: any) {
    state.addressInfo = addressInfo
  }
}

const actions = {
  // 城市信息
  async getCity({ commit }, city) {
    commit(ActionType.SET_CITY, city)
    return city
  },
  // 小区信息
  async getCommunity({ commit }, community) {
    commit(ActionType.SET_COMMUNITY, community)
    return community
  },
  // 编辑地址时的地址信息
  async getEditAddress({ commit }, addressInfo) {
    commit(ActionType.SET_EDIT_ADDRESS, addressInfo)
    return addressInfo
  }
}

const getters = {
  city: (state: StateType) => state.city,
  community: (state: StateType) => state.community,
  addressInfo: (state: StateType) => state.addressInfo,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
