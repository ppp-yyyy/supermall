<template>
  <div id="home">
    
    <!-- 顶部导航-->
    <nav-bar class="home-nav">
      <div slot='center'>购物街</div>
    </nav-bar>
    
    <tab-control 
      :titles="[('流行','流行'), ('新款','新款'), ('精选','精选')]"             @tabClick='tabClick' 
      ref="tabControl1" 
      class="tab-control"
      v-show="isTabFixed"/>
    
    <!--此处需要加上：，加上：传过去的是数字3，只要不加：，传过去的是字符串3-->
    <scroll class="content" 
      ref="scroll" 
      :probe-type = "3" 
      @scroll="contentScroll"
      :pull-up-load = "true"
      @pullingUp="loadMore">
      
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--推荐信息-->
      <recommend-view :recommends="recommends"/>
      <!--本周流行-->
      <feature-view/>
      
      <tab-control  
        :titles="[('流行','流行'), ('新款','新款'), ('精选','精选')]"
        @tabClick = 'tabClick'
        ref ="tabControl2"/>
      <!--商品列表-->
      <goods-list :goods="showGoods" />
    </scroll>
    
    <!--在我们需要监听一个组件的原生事件时,必须给对应的事件加上.native修饰符,才能进行监听-->
    <back-top @click.native='backClick' v-show="isShowBackTop"/>
  </div>
  
</template>

<script>
  
  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from "components/content/tabControl/TabControl"
  import Scroll from 'components/common/scroll/Scroll'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  
  //页面内使用的组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from 'components/content/goods/GoodsList'
  import { getHomeMultidata, getHomeGoods } from 'network/home'

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView, 
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    //混入
    mixins: [itemListenerMixin, backTopMixin],
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false, 
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      //在created中只写主要逻辑，将请求数据的详细处理逻辑单独拿出来放到methods中
      this.getHomeMultidata()
      //2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated(){
      // 进入时滚动到离开时的位置this.saveY
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      // 进入时再刷新，避免出现小问题
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //1.保存离开首页时的Y坐标
      this.saveY = this.$refs.scroll.getScrollY()
      //2.离开首页时，取消对全局事件的监听（主页图片加载的监听）
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    
    mounted(){
    },
    methods:{
      //1. 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log("首页数据:", res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(type, "第", page, "页商品数据", res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1 //更新data中的页码
          console.log(this.goods)
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      
      //2.事件监听相关
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      
      //监听页面滚动
      contentScroll(position){
        //1.判断backTop是否显示
        this.isShowBackTop = -position.y > 1000
        
        //2.决定tabControl是否吸顶（position: fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop //545
      },

      loadMore(){
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad(){
        //获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /* position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9; */
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left:0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /* .content{
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
