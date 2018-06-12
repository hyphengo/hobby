
import { queryOrderList } from '@/api'
import { pageList, initListData, ListType } from '../helpers'

const ActionType = {
  SET_ORDER_LIST: 'SET_ORDER_LIST',
}

type StateType = {
  list?: ListType;
}

const state: StateType = {
  list: initListData,
}

const mutations = {
  [ActionType.SET_ORDER_LIST](state: StateType, payload: ListType) {
    state.list = pageList(state, payload, 'list', 'data')
  },
}

const actions = {
  async getOrderList({ commit, dispatch }, params) {
    const res = await queryOrderList({
      page: params.page,
      pageSize: params.size,
      ...params.query
    })

    commit(ActionType.SET_ORDER_LIST, res.data)

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
  getters,
}
