<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        <div>购物街</div>
      </div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>
    <goods-list :goods="goods.pop.list"></goods-list>
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
      <li>列表2</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabController/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import {getHomeMultidata, getHomeGoods} from "network/home";


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
      }
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    GoodsList,
    TabControl
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
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
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
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

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
