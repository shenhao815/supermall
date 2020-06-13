import {localRequest, request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/why/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return localRequest({
    url: '/loc/home/datas',
    params: {
      type,
      page
    }
  })
}
