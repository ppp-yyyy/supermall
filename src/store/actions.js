import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {
        //1. 查找之前的数组中是否有payload新添加的商品
        // let oldProduct = null;
        // for(let item of state.cartList){
        //     if(item.iid === payload.iid){
        //         oldProduct = item;
        //     }
        // }
        return new Promise((resolve) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //2. 判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve("商品数量加1")
            } else {
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve("商品添加到购物车")
            }
        })
    }
}