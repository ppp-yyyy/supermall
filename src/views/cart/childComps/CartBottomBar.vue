<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
        :is-checked='isSelectAll' 
        class="check-button"
        @click.native='checkClick'/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>
<script>
  import CheckButton from "components/content/checkButton/CheckButton"
  import { mapGetters } from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        //   return '￥' + this.$store.state.cartList.filter(item => {
        return '￥' + this.cartList.filter(item => {  // mapGetters结构之后这样写
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2) // toFixed(2) 计算结果保留2位小数
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // 1. filter会将数组全部遍历完
        // if(this.cartList.length === 0) return false
        //   return !(this.cartList.filter(item => !item.checked).length) // 对未被选中的商品长度进行取反，0取反为true
        // 2.简单遍历，也会全部遍历完
        // for(let item of this.cartList){
        //     if(!item.checked){ // 没有选中的情况为真
        //             return false
        //         }
        //     }
        //         return true
        // 3. find 只找到一个就不找了，性能会高一点
        if (this.cartList.length === 0) return false  // 购物车中没有商品时，默认不选中
        return !(this.cartList.find(item => !item.checked)) // (括号里面有值的情况下再取反，结果就为false)
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked = false);
        }else{
          this.cartList.forEach(item => item.checked = true);
        }
      }
    }
  }
</script>
<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color:#eee;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
</style>
