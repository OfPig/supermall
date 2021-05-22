<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" @click.native="selectAll" :is-checked="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{ totalPrice }}
    </div>
    <div class="calculate">
      去结算:{{ checkCount }}
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
      return '￥' + this.$store.state.cartList.filter((item) => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkCount() {
      return this.getList.filter((item) => item.checked).length
    },
    isSelectAll() {
      //this.isAll = (this.getList.length != 0 && this.getList.filter((item) => item.checked).length == this.getList.length)
      return this.getList.length != 0 && !this.getList.find(item => !item.checked)

    }
  },
  components: {
    CheckButton
  },
  methods: {
    selectAll() {
      this.$store.commit('selectAll', this.isSelectAll)
    }
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
  width: 80px;
}

.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
  align-items: center;
  line-height: 40px;
}

.calculate {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 40px;
  align-items: center;
  text-align: center;
  line-height: 44px;
  float: right;
  font-weight: normal;
}
</style>
