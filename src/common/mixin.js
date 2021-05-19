import {debounce} from "./utils";
import BackTop from "components/content/backtop/BackTop";

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

export const backTop = {
  data(){
    return{
      isShow: false,
    }
  },
  components:{
    BackTop
  },
  methods:{
    //回到顶部
    backClick() {
      this.$refs.scroll.ToTop(0, 0)
    },
    showBar(position){
      this.isShow = position.y < -1500;
    }
  }
}
