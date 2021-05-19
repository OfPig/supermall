<template>
  <div id="detail">
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <detail-nar-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nar-bar>
    <scroll class="content" ref="scroll" @scroll="getPosition" :probeType="probeType">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramsInfo" ref="param"></detail-param-info>
      <detail-comment :comment-info="commentInfo" ref="comment"></detail-comment>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <!--组件不能直接监听，要使用native让它变成原生监听-->
    <back-top v-show="isShow" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import DetailNarBar from "./detailComps/DetailNarBar";
import DetailSwiper from "./detailComps/DetailSwiper";
import DetailBaseInfo from "./detailComps/DetailBaseInfo";
import DetailShopInfo from "./detailComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./detailComps/DetailGoodsInfo";
import DetailParamInfo from "./detailComps/DetailParamInfo";
import DetailComment from "./detailComps/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList";
import DetailBottomBar from "./detailComps/DetailBottomBar";

import {getDetail, GoodsInfo, Shop, GoodsParam, getRecommend} from "network/detail";
import {itemListenerMixin,backTop} from "common/mixin";
import {debounce} from "common/utils";

export default {
  name: "Detail",
  components: {
    DetailNarBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    GoodsList,
    DetailBottomBar,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      topY: [],
      getTopY: null,
      probeType: 3,
      index: 0,
      isShow: false,
    }
  },
  created() {
    this.iid = this.$route.query.id
    this.getDetail()
    this.getRecommend()
    this.getTopY = debounce(() => {
      this.topY = []
      this.topY.push(0)
      this.topY.push(this.$refs.param.$el.offsetTop)
      this.topY.push(this.$refs.comment.$el.offsetTop)
      this.topY.push(this.$refs.recommend.$el.offsetTop)
      this.topY.push(Number.MAX_VALUE)
    })
  },
  mixins: [itemListenerMixin,backTop], //home和detail中的重复代码放到mixin中
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    //获取网络请求数据
    getDetail() {
      getDetail(this.iid).then(res => {
        const data = res.data.result
        this.topImages.push(...(data.itemInfo.topImages))

        //获取商品信息
        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo);

        //商品详细数据
        this.detailInfo = data.detailInfo

        //获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //评论信息
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }
        /*图片未加载完，值错误*/
        /*this.$nextTick(()=>{
          this.topY = []
          this.topY.push(0)
          this.topY.push(this.$refs.param.$el.offsetTop)
          this.topY.push(this.$refs.comment.$el.offsetTop)
          this.topY.push(this.$refs.recommend.$el.offsetTop)
        })*/
      })
    },
    imgLoad() {
      this.refresh()
      this.getTopY()
    },
    getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })
    },
    titleClick(index) {
      this.$refs.scroll.ToTop(0, -this.topY[index])
    },
    getPosition(position) {
      for (let i = 0; i < this.topY.length - 1; i++) {
        /*if ((-position.y >= this.topY[this.topY.length - 1])) {
          this.index = this.topY.length - 1
        }*/
        if ((-position.y >= this.topY[i]) && (-position.y < this.topY[i + 1])) {
          this.index = i
        }
      }
      this.$refs.nav.currentIndex = this.index

      //判断BackTop是否显示
      this.showBar(position)
    },
    addCart(){
      //购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice;
      product.iid = this.iid
      this.$store.dispatch('addCart',product)
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  overflow: hidden;
  height: calc(100% - 44px - 58px);
}

</style>
