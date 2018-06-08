
import { addItem } from '@/api'

const ActionType = {
  SET_CART_COUNT: 'SET_CART_COUNT',
}

type StateType = {
  cartCount?: number;
}

const state: StateType = {
  cartCount: 0,
}

const mutations = {
  // 设置购物车内数量
  [ActionType.SET_CART_COUNT](state: StateType, num: number) {
    state.cartCount = num
  },
}

const actions = {
  async addCart({ commit, dispatch }, {id, num}) {
    const res = await addItem(id, num)

    commit(ActionType.SET_CART_COUNT, res.data.cartCount)

    return res
  },
}

const getters = {
  count: (state: StateType) => state.cartCount,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
