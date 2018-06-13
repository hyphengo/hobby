/**
 * @file ModalRouter.ts
 * @author lihuanji
 */
import Vue from 'vue'

// 这里可能要记录一下路径

const refs: any = {}

/**
 * 模拟打开路由
 * @param callback
 */
function openRouter(callback) {
  const loca = window.location
  let url = loca.href

  if (!/#history/.test(url)) {
    url += url.indexOf('#') === -1 ? '#history' : 'history'
  }

  window.location.href = url

  callback()
}

function replaceRouter(callback) {
  const loca = window.location
  let url = loca.href

  if (/#history/.test(url)) {
    url = url.replace('#history', '#')
  }

  window.location.href = url
}

const handles: any = {
  has: function (target, prop) {
    return prop in target
  },

  get: function (target, prop) {
    return target[prop]
  },

  set: function (target, prop, value) {
    const hasProp = prop in target
    const cur = target[prop]

    if (!hasProp) {
      throw new Error(`The ${prop} not found`)
    }

    if (cur !== value) {
      target[prop] = value
    }

    return target
  }
}

const mo: any = new Proxy({
  open: false,
  uid: null,
}, handles)

function MoRouterClose(target: Vue, name: string, descriptor: any): void {
  const method = descriptor.value

  descriptor.value = function close(...args) {
    replaceRouter(() => {
      mo.open = false
      method.apply(this, args.concat(mo.open))
    })
  }
}

function MoRouterOpen(target: Vue, name: string, descriptor: any): void {
  const method = descriptor.value

  descriptor.value = function open(...args) {
    mo.uid = this._uid

    // 添加 hash
    openRouter(() => {
      mo.open = true
      method.apply(this, args.concat(mo.open))
    })
  }
}

const ModalRouter: any = {
  state: mo,
  name: 'ModalRouter',
  open: MoRouterOpen,
  close: MoRouterClose,
  refs,
}

export default ModalRouter
