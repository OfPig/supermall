<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        <div>购物街</div>
      </div>
    </nav-bar>
    <swiper>
      <swiper-item v-for="item in banners">
          <img :src="item.image" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {getHomeMultidata} from "network/home";
import {Swiper, SwiperItem} from 'components/common/swiper/index'

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
    Swiper,
    SwiperItem
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
