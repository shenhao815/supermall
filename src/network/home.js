import {localRequest, request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return localRequest({
    url: 'home/datas',
    params: {
      type,
      page
    }
  })
}
