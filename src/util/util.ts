/**
 * 拼接查询字符串
 *
 * @param {Object} obj 查询数据对象
 * @return {string} 拼接后的字符串
 */
export const parseQuerystring = obj => {
  let result = ''

  if (obj) {
    const tmp = []
    const entries = Object.entries(obj)

    entries.forEach(item => {
      const key = item[0]
      const value: any = item[1]

      if (value instanceof Array && value.length) {
        value.forEach(v => {
          tmp.push(`${key}=${encodeURIComponent(v)}`)
        })
      } else {
        tmp.push(`${key}=${encodeURIComponent(value)}`)
      }
    })

    result = tmp.join('&')
  }

  return result
}

/**
 * 判断是否为 Array
 * @param {*} data 任意数据
 */
export const isArray = (data) => {
  return typeof data === 'object' && Object.prototype.toString.call(data) === '[object Array]'
}

/**
 * 过滤掉查询参数，value 为空的
 * @param params, {xx: ...}
 */
export const filterEmptyQuery = params => {
  const ps = {}

  Object.keys(params).forEach(k => {
    if (params[k] !== '') {
      ps[k] = params[k]
    }
  })

  return ps
}

export function getPropByPath(obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  let keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    let key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
}

export const toFixed = function (num, n = 2) {
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20')
  }
  const number = num
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString()
  }
  if (typeof (n) === 'undefined' || n === 0) {
    return (Math.round(number)).toString()
  }

  let result = number.toString()
  const arr = result.split('.')

  // 整数的情况
  if (arr.length < 2) {
    result += '.'
    for (let i = 0; i < n; i += 1) {
      result += '0'
    }
    return result
  }

  const integer = arr[0]
  const decimal = arr[1]
  if (decimal.length === n) {
    return result
  }
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0'
    }
    return result
  }
  result = integer + '.' + decimal.substr(0, n)
  const last = decimal.substr(n, 1)

  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
    const x = Math.pow(10, n)
    result = (Math.round((parseFloat(result) * x)) + 1) / x
    result = result.toFixed(n)
  }

  return result
}

/**
 * 格式化价格
 * @param {*} num 要格式话的数字
 * @param {*} digit 小数点后几位
 */
export function price(num: string | number, digit: number = 2) {
  let p: number | string

  if (typeof num === 'string') {
    p = Number(num)
  } else {
    p = num
  }

  if (isNaN(p)) {
    return '0'
  }

  if (digit) {
    p = toFixed(p)
  }

  // 转换为 1,000.00 格式
  // p = p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return p
}

export function setWXTitle(title) {
  document.title = title
  const i = document.createElement('iframe')
  i.src = `${process.env.PUBLIC_PATH}static/blank.html`
  i.style.display = 'none'
  i.onload = function () {
    setTimeout(() => {
      i.remove()
    }, 9)
  }
  document.body.appendChild(i)
}

export function IsURL (URL) {
  const str = URL
  const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
  const objExp = new RegExp(Expression)

  return objExp.test(str)
}
