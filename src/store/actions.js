import {ADD_COUNTER,ADD_PRODUCT} from './mutation-types'

export default {
  addCart(store, payload) {
    let index = store.state.cartList.findIndex((item) => {
      return item.iid == payload.iid
    })
    if (index == -1) {
      payload.count = 1
      store.commit(ADD_PRODUCT,payload)
    }else {
      store.commit(ADD_COUNTER,index)
    }
  }
}
