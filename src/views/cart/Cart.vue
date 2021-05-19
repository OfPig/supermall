<template>
  <div id="cart">
    <!--导航-->
    <nav-bar class="cart-nav">
      <div slot="center">
        购物车({{ length }})
      </div>
    </nav-bar>
    <!--商品展示-->
    <cart-list></cart-list>
    <!--结算设置-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./cartComps/CartList";
import CartBottomBar from "./cartComps/CartBottomBar";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  computed: {
    //两种用法
    ...mapGetters({
      length: 'getCount'
    })

    /*...mapGetters([ //混入getters中的getCount方法
      'getCount'
    ])*/
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  }
}
</script>

<style scoped>
#cart {
  height: 100vh;
  position: relative;
}

.cart-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

</style>
