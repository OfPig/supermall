<template>
  <div class="cart-list">
    <scroll class="wrapper" :probeType="3" ref="scroll">
      <cart-item v-for="(item,index) in getList" :key="index" :product="item"></cart-item>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "components/common/scroll/Scroll";
import CartItem from "./CartItem";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartItem
  },
  computed:{
    ...mapGetters(['getList'])
  },
  activated() {
    //添加完新的商品后scroll重新计算高度
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.wrapper{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
}

</style>
