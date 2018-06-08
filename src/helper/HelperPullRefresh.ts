/**
 * @file HelperPullRefresh.ts
 * @author lihuanji
 *
 * pull refresh 辅助类
 */
const defaultConfig = {
  loading: false,
  finished: false,
  empty: false,
  failed: false,
  page: 0,
  size: 20,
}

let indexPage = 1;

function HelperPullRefresh(actionKey: string, listKey: string) {
  return function (target, name, descriptor) {
    const method = descriptor.value

    descriptor.value = function (...args) {
      // ve-scroll first param
      // 0: refresh
      // 1: pull more
      const type = args[0]
      // Primise or store.action
      const actionFn = this[actionKey]
      // Create page config
      const $p = this.pageConfig = Object.assign(defaultConfig, this.pageConfig || {})

      if (type === 0) {
        indexPage = 1
      }

      // next page
      $p.page = indexPage++

      const params = {
        page: $p.page,
        size: $p.size,
        // 其他额外查询参数
        ...($p.others && { ...$p.others })
      }

      if (actionFn) {
        $p.loading = true
        $p.failed = false

        actionFn(params).then((data: any) => {
          const total = this[listKey].total
          $p.failed = false
          $p.loading = false
          // 判断是否全部加载完成
          $p.finished = $p.page * $p.size >= total
          // 判断是否没有任何数据
          $p.empty = total === 0

          method.apply(this, args.concat([data]))
        }).catch((ex: Error) => {
          $p.failed = true
          method.apply(this, args.concat([ex]))
        })
      } else {
        method.apply(this, args)
      }
    }
  }
}

export default HelperPullRefresh
