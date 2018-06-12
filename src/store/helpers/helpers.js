import { isArray } from '@/util/util'

// 初始化数据
export const initListData = {
  items: [],
  page: 1,
  total: 0
}

/**
 * 统一格式化分页数据格式
 *
 * @param state State
 * @param result result.data
 * @param key state.key
 * @param viewModel 数据模型
 */
export function pageList(state, result, key, take, viewModel) {
  let res = result
  if (result === null) {
    return initListData
  }

  // 先转换一次后端数据
  const data = {
    items: res[take],
    page: res.pageNum,
    total: res.total
  }

  // 如果有 items 的 view-model 则直接使用
  const items = viewModel || data.items

  return {
    page: data.page,
    total: data.total,
    items: data.page === 1 ? items : state[key].items.concat(items)
  }
}

/**
 * 格式化数据为 ve-select 需要的格式
 * @param {*} data 后端数据
 */
export const format2SelectList = (data = [], kv = { key: 'id', value: 'name' }) => {
  if (!isArray(data)) {
    return null
  }

  return data.map(item => ({
    key: item && item[kv.key],
    text: item && item[kv.value],
  }))
}
