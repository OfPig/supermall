import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    //防抖动
    this.refresh = debounce(this.$refs.scroll.refresh)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
