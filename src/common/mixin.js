import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop';

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null,
      //加这个可以让对监听的事件进行保存，使得Home组件和Detail组件各自执行自己的事件
      newRefresh: null
    }
  },
  mounted(){
    //1.监听GoodListItem中图片加载完成
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    //对监听的事件进行保存
    this.itemImgListener = () => {
      //刷新，让better-scroll重新计算可滚动的高度
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('我是混入内容');
  }
}

export const backTopMixin = {  
  components:{
    BackTop
  },
  data(){
    return {
        isShowBackTop: false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0,300)
    },
  }
}