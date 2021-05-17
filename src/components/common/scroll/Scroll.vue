<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })

    //监听滚动
    this.scroll.on('scroll',position=>{
      this.$emit('scroll',position)
    })

    //监听滚动到底部
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
  methods: {
    ToTop(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()//让每次上拉加载都执行(不加的话只执行一次上拉加载)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
