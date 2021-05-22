import {ADD_COUNTER,ADD_PRODUCT} from './mutation-types'

export default {
  addCart(store, payload) {
    return new Promise((resolve, reject) => {
      let index = store.state.cartList.findIndex((item) => {
        return item.iid == payload.iid
      })
      if (index == -1) {
        payload.count = 1
        store.commit(ADD_PRODUCT,payload)
        resolve('添加商品成功！')
      }else {
        store.commit(ADD_COUNTER,index)
        resolve('商品数量 +1！')
      }
    })
  }
}
