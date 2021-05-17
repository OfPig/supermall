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
import {debounce} from "common/utils";

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
      saveY: 0
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
  mounted() {
    //防抖动
    const refresh = debounce(this.$refs.scroll.refresh)
    //监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })

  },
  activated() {
    this.$refs.scroll.ToTop(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods: {
    /*网络请求*/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //请求轮播图和推荐数据
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
        this.banners[0].image='https://s11.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg'
        this.banners[1].image='https://s11.mogucdn.com/mlcdn/c45406/180926_31eb9h75jc217k7iej24i2dd0jba3_750x390.jpg'
        this.banners[2].image='https://s11.mogucdn.com/mlcdn/c45406/180919_3f62ijgkj656k2lj03dh0di4iflea_750x390.jpg'
        this.banners[3].image='https://s11.mogucdn.com/mlcdn/c45406/180917_18l981g6clk33fbl3833ja357aaa0_750x390.jpg'
        this.recommends[0].image = 'https://s11.mogucdn.com/mlcdn/c45406/180913_036dli57aah85cb82l1jj722g887g_225x225.png'
        this.recommends[1].image = 'https://s11.mogucdn.com/mlcdn/c45406/180913_25e804lk773hdk695c60cai492111_225x225.png'
        this.recommends[2].image = 'https://s11.mogucdn.com/mlcdn/c45406/180913_387kgl3j21ff29lh04181iek48a6h_225x225.png'
        this.recommends[3].image = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.aj168.com.cn%2F3342649149_4097621264_26_0.jpg&refer=http%3A%2F%2Fimg.aj168.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623824222&t=42428cc6d326f0ecaec5621fafa7d9bb'
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
