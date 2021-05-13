<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        <div>购物街</div>
      </div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
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
    HomeSwiper
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.data.banner.list
      /*this.banners[0].image = "assets/img/xjw/4.jpg"
      this.banners[1].image = "assets/img/xjw/5.jpg"
      this.banners[2].image = "assets/img/xjw/6.jpg"
      this.banners[3].image = "assets/img/xjw/7.jpg"*/
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
