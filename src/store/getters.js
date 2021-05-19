export default {
  getCount(state,getters){
    return state.cartList.length
  },
  getList(state,getters){
    return state.cartList
  }
}
