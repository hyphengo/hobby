import { searchProductList, getProductDetail } from '@/api'
import { pageList, initListData, ListType } from '../helpers'

interface StateType {
  list?: ListType;
  detail?: Object
}

const ActionType = {
  GOT_PRODUCT_LIST: 'GOT_PRODUCT_LIST',
  CLEAR_PRODUCT_LIST: 'CLEAR_PRODUCT_LIST',
  GOT_PRODUCT_DETAIL: 'GOT_PRODUCT_DETAIL'
}

const state = {
  list: initListData,
  detail: {}
}

const mutations = {
  [ActionType.GOT_PRODUCT_LIST](state: StateType, payload: ListType) {
    state.list = pageList(state, payload, 'list', 'records')
  },
  [ActionType.CLEAR_PRODUCT_LIST](state: StateType) {
    state.list = initListData
  },
  [ActionType.GOT_PRODUCT_DETAIL](state: StateType, payload: Object) {
    state.detail = payload
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
  },
  async getProductDetail({ commit }, id) {
    const res = await getProductDetail(id)

    commit(ActionType.GOT_PRODUCT_DETAIL, res.data)
  }
}

const getters = {
  list: (state: StateType) => state.list,
  detail: (state: StateType) => state.detail,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
