import { searchProductList } from '@/api'
import { pageList, initListData, ListType } from '../helpers'

interface StateType {
  list?: ListType;
}

const ActionType = {
  GOT_PRODUCT_LIST: 'GOT_PRODUCT_LIST',
}

const state = {
  list: initListData,
}

const mutations = {
  [ActionType.GOT_PRODUCT_LIST](state: StateType, payload: ListType) {
    state.list = pageList(state, payload, 'list')
  },
}

const actions = {
  async searchProductList({ commit }, params) {
    console.log(params)
    const res = await searchProductList({
      pageNum: params.page,
      pageSize: params.size,
      ...params.query
    })

    commit(ActionType.GOT_PRODUCT_LIST, res.data)

    return res
  },
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
