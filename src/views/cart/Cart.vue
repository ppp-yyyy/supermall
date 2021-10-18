<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list class="cart-list"/>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
  //公共组件
  import NavBar from 'components/common/navbar/NavBar'
  //页面组件
  import CartList from './childComps/CartList'
  import CartBottomBar from "./childComps/CartBottomBar"

  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //两种用法
      // ...mapGetters(['cartLength','cartList'])
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color:white;
    /* font-weight: 700; */
  }
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
