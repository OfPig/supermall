<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>
      <div class="price">
        合计：{{ totalPrice }}
      </div>
      <div class="calculate">
        去结算:{{checkCount}}
      </div>

  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  computed: {
    ...mapGetters(['getList']),
    totalPrice() {
      return '￥'+this.$store.state.cartList.filter((item) => {
        return  item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkCount(){
      return this.getList.filter((item)=> item.checked).length
    }
  },
  components: {
    CheckButton
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  position: relative;
  bottom: 89px;
  display: flex;
}

.check-content {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 5px;
  width: 40px;
}

.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}
.calculate{
  width: 90px;
  background-color: red;
}
</style>
