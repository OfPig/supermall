<template>
  <div id="detail">
    <detail-nar-bar @titleClick="titleClick"></detail-nar-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramsInfo" ref="param"></detail-param-info>
      <detail-comment :comment-info="commentInfo" ref="comment"></detail-comment>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
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

import {getDetail,GoodsInfo,Shop,GoodsParam,getRecommend} from "network/detail";
import {itemListenerMixin} from "common/mixin";
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
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop:{},
      detailInfo:{},
      paramsInfo:{},
      commentInfo:{},
      recommends:[],
      topY:[],
      getTopY:null
    }
  },
  created() {
    this.iid = this.$route.query.id
    this.getDetail()
    this.getRecommend()
    this.getTopY = debounce(()=>{
      this.topY = []
      this.topY.push(0)
      this.topY.push(this.$refs.param.$el.offsetTop)
      this.topY.push(this.$refs.comment.$el.offsetTop)
      this.topY.push(this.$refs.recommend.$el.offsetTop)
    })
  },
  mixins:[itemListenerMixin], //home和detail中的重复代码放到mixin中
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods: {
    //获取网络请求数据
    getDetail() {
      getDetail(this.iid).then(res => {
        const data = res.data.result
        this.topImages.push(...(data.itemInfo.topImages))

        //获取商品信息
        this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)

        //获取店铺信息
        this.shop = new Shop(data.shopInfo);

        //商品详细数据
        this.detailInfo = data.detailInfo

        //获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //评论信息
        if (data.rate.cRate !=0){
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
    imgLoad(){
      this.refresh()
      this.getTopY()
    },
    getRecommend(){
      getRecommend().then(res=>{
        this.recommends = res.data.data.list
      })
    },
    titleClick(index){
       this.$refs.scroll.ToTop(0,-this.topY[index])
    }
  }
}
</script>

<style scoped>
#detail{
  position:relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}
.content {
  overflow: hidden;
  height: calc(100% - 44px);
}
</style>
