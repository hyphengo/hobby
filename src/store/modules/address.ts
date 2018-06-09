
const ActionType = {
  SET_CITY: 'SET_CITY',
  SET_COMMUNITY: 'SET_COMMUNITY',
}

type StateType = {
  cityCode?: string;
  cityName?: string;
  communityName?: string;
}

const state: StateType = {
  cityCode: '',
  cityName: '',
  communityName: '',
}

const mutations = {
  // 城市信息
  [ActionType.SET_CITY](state: StateType, city: any) {
    state.cityCode = city.cityCode
    state.cityName = city.cityName
  },
  // 小区信息
  [ActionType.SET_COMMUNITY](state: StateType, community: any) {
    state.communityName = community.name
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
  }
}

const getters = {
  getCityCode: (state: StateType) => state.cityCode,
  getCityName: (state: StateType) => state.cityName,
  getCommunityName: (state: StateType) => state.communityName,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
