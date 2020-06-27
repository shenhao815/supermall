import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  // context为当前上下文
  // 也可以写成 addToCart({state,commit},playload){}
  // {state,commit}的写法也就对象的解构
  addToCart(context, playload) {
    // 1.payload新添加的商品
    /*let oldProduct = null
    for (let item of state.cartList) {
      if (item.iid === playload.iid) {
        oldProduct = item
      }
    }*/

    /*let product = state.cartList.find(function (item) {
      return item.iid === playload.iid
    })*/

    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === playload.iid)
      // 2。判断oldProduct
      if (oldProduct) {
        //oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        playload.count = 1
        //context.state.cartList.push(playload)
        playload.checked = true
        context.commit(ADD_TO_CART, playload)
        resolve('添加新的商品')
      }
    });
  }
}
