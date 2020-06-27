import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点，以便进行状态state的状态管理
  [ADD_COUNTER](state, playload) {
    playload.count ++
  },
  [ADD_TO_CART](state,playload) {
    state.cartList.push(playload)
  }
}
