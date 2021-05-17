<template>
  <div id="detail">
    <detail-nar-bar></detail-nar-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNarBar from "./detailComps/DetailNarBar";
import DetailSwiper from "./detailComps/DetailSwiper";
import DetailBaseInfo from "./detailComps/DetailBaseInfo";
import DetailShopInfo from "./detailComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";

import {getDetail,GoodsInfo,Shop} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNarBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop:{}
    }
  },
  created() {
    this.iid = this.$route.query.id
    this.getDetail()
  },
  methods: {
    //获取网络请求数据
    getDetail() {
      getDetail(this.iid).then(res => {
        console.log(res)
        const data = res.data.result
        this.topImages.push(...(data.itemInfo.topImages))

        //获取商品信息
        this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)

        //获取店铺信息
        this.shop = new Shop(data.shopInfo)
      })
    }
  }
}
</script>

<style scoped>
#detail{
  position:relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
