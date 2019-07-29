export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function genderChanger (gnerderNum) {
  if (gnerderNum === 0) {
    return '女'
  } else if (gnerderNum === 1) {
    return '男'
  }
  return '未知'
}
export function dateTransformer (data) {
  if (Array.isArray(data)) {
    for (const item of data) {
      transformer(item)
    }
  } else {
    transformer(data)
  }
  return data
  function transformer (item) {
    if (item.exp_begin_time !== undefined) {
      item.exp_begin_time = dateBuilder(item.exp_begin_time)
    }
    if (item.exp_end_time) {
      item.exp_end_time = dateBuilder(item.exp_end_time)
    }
    if (item.submit_time) {
      item.submit_time = dateBuilder(item.submit_time)
    }
    if (item.apply_end_time) {
      item.apply_end_time = dateBuilder(item.apply_end_time)
    }
    if (item.exp_modify_time) {
      item.exp_modify_time = dateBuilder(item.exp_modify_time)
    }
  }
}
function dateBuilder (date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year + '-' + month + '-' + day
}
