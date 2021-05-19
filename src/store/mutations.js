import {ADD_COUNTER, ADD_PRODUCT, UPDATE_CHECK} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    state.cartList[payload].count++
  },
  [ADD_PRODUCT](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [UPDATE_CHECK](state, payload) {
    const index = state.cartList.findIndex((item) => {
      return item.iid == payload.iid
    })
    state.cartList[index].checked = !state.cartList[index].checked
  }
}
