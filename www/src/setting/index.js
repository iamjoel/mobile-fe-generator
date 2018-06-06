import standardizeMenu from '@/assets/utils/standardize-menu-config'
var HOST

HOST = 'http://127.0.0.1:8002'

export const IMGS_PREFIX = `${HOST}/imgs`
export var SERVER_PREFIX = `${HOST}`

// 接口地址
export const urls = {
  addPic: `${SERVER_PREFIX}/addPic`,
  account: addUrlGroup(`${SERVER_PREFIX}/account`),
}
// 根据实体生成 urls
import entities from '@/setting/base/entities'
entities.forEach(item => {
  urls[item.key] = addUrlGroup(`${SERVER_PREFIX}/${item.key}`)
})

// 全栈JavaScript错误监控 https://fundebug.com/
export const fundebugAPIKey = 'b3899a382b2a7117d2d479959a07a18b3d92d6a7a5ebd6ef14d14eac699be95d'

function addUrlGroup (prefix, types = ['list', 'detail', 'add', 'edit', 'del'], others) {
  var res = {}
  if(others && others.length > 0) {
    types = [...types, ...others]
  }
  types.forEach(type => {
    res[type] = `${prefix}/${type}`
  })
  return res
}

