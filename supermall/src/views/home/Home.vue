<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        <div>购物街</div>
      </div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3" :pullUpLoad="true"
            @scroll="getPosition" @pullingUp="LoadMore">
      <home-swiper :banners="banners" @swiperImageLoad="ImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--组件不能直接监听，要使用native让它变成原生监听-->
    <back-top v-show="isShow" @click.native="backClick"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabController/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import {getHomeMultidata, getHomeGoods} from "network/home";
import {itemListenerMixin} from "common/mixin";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    GoodsList,
    Scroll,
    BackTop,
    TabControl
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mixins:[itemListenerMixin],
  activated() {
    this.$refs.scroll.ToTop(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

    //取消全局监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    /*网络请求*/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //请求轮播图和推荐数据
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type) {
      //获取首页栏位数据
      getHomeGoods(type, this.goods[type].page + 1).then(res => {
        this.goods[type].list.push(...(res.data.data.list))
        this.goods[type].page++;

        this.$refs.scroll.finishPullUp()
      })
    },
    //栏位点击
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    //回到顶部
    backClick() {
      this.$refs.scroll.ToTop(0, 0)
    },
    //获取显示回顶按钮位置
    getPosition(position) {
      //判断BackTop是否显示
      this.isShow = position.y < -1500;

      //TabControl吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    //加载更多数据
    LoadMore() {
      this.getHomeGoods(this.currentType)
    },
    ImageLoad() {

      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}


.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

</style>
