
const ActionType = {
  SET_CITY: 'SET_CITY',
  SET_COMMUNITY: 'SET_COMMUNITY',
  SET_EDIT_ADDRESS: 'SET_EDIT_ADDRESS',
  SET_SELECT_ADDRESS: 'SET_SELECT_ADDRESS',
}

type StateType = {
  city?: any;
  community?: any;
  addressInfo?: any;
  addressDeter?: any;
}

const state: StateType = {
  city: {},
  community: {},
  addressInfo: {},
  addressDeter: {},
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
  },
  // 结算时选择地址
  [ActionType.SET_SELECT_ADDRESS](state: StateType, addressDeter: any) {
    state.addressDeter = addressDeter
  }
}

const actions = {
  // 城市信息
  async setCity({ commit }, city) {
    commit(ActionType.SET_CITY, city)
    return city
  },
  // 小区信息
  async setCommunity({ commit }, community) {
    commit(ActionType.SET_COMMUNITY, community)
    return community
  },
  // 编辑地址时的地址信息
  async setEditAddress({ commit }, addressInfo) {
    commit(ActionType.SET_EDIT_ADDRESS, addressInfo)
    return addressInfo
  },
  // 结算时选择地址
  async setSelectAddress({ commit }, addressDeter) {
    commit(ActionType.SET_SELECT_ADDRESS, addressDeter)
    return addressDeter
  }
}

const getters = {
  city: (state: StateType) => state.city,
  community: (state: StateType) => state.community,
  addressInfo: (state: StateType) => state.addressInfo,
  addressDeter: (state: StateType) => state.addressDeter,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
