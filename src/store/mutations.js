import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default{
    //mutations唯一的目的是修改state中的状态
    //mutations中完成的事情尽可能比较单一一点            
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.count = 1;
        state.cartList.push(payload);
        payload.checked = true;
    }
}