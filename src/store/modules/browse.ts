import { searchProductList } from '@/api'
import { pageList, initListData, ListType } from '../helpers'

interface StateType {
  list?: ListType;
}

const ActionType = {
  GOT_PRODUCT_LIST: 'GOT_PRODUCT_LIST',
  CLEAR_PRODUCT_LIST: 'CLEAR_PRODUCT_LIST',
}

const state = {
  list: initListData,
}

const mutations = {
  [ActionType.GOT_PRODUCT_LIST](state: StateType, payload: ListType) {
    state.list = pageList(state, payload, 'list')
  },
  [ActionType.CLEAR_PRODUCT_LIST](state: StateType) {
    state.list = initListData
  }
}

const actions = {
  async searchProductList({ commit }, params) {
    const res = await searchProductList({
      pageNum: params.page,
      pageSize: params.size,
      ...params.query
    })

    commit(ActionType.GOT_PRODUCT_LIST, res.data)

    return res
  },
  clearProductList({ commit }) {
    commit(ActionType.CLEAR_PRODUCT_LIST)
  }
}

const getters = {
  list: (state: StateType) => state.list,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
