<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        <div>购物街</div>
      </div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import {getHomeMultidata} from "network/home";


export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends:[]
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
</style>
