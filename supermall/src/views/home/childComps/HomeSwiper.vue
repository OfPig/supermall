<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <img :src="item.image" alt="" @load="imageLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data(){
    return{
      isLoad:false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
