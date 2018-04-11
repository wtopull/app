<template>
<div class="cart">
    <div class="cart-num">
    <div><van-stepper v-model="value"/><span>倍</span></div>
    <div><span :class="{'active': index === lists}" v-for="(moneys,index) in money" :key="index" @click="moneyC($event,index,moneys)">{{moneys}}</span></div>
     </div>
    <div class="basket">
        <div class="basket-left active">
            <i class="el-icon-plus"></i>
            <div>
                <p>共0注，{{allmoney | keepTwoNum}}元</p>
                <p><span>01</span><span>01</span><span>01</span><span>01</span><span>01</span><span>01</span><span>01</span><span>01</span><span>01</span><span>01</span><span>01</span></p>
            </div>
        </div>
        <div class="basket-right"><van-icon name="shopping-cart" info="0"/>号码篮</div>
    </div>
</div>
</template>
<script>
export default{
    data(){
        return{
            value:1,
            lists:0,
            allmoney:0,
            money:['元','角','分']
        }
    },
    methods:{
        moneyC(event,index,moneys){
            this.lists = index;
        }
    },

    // 保留二个小数
    filters:{
        keepTwoNum(value){
            value = Number(value);
            return value.toFixed(2);
        }
    }
    
}
</script>
<style lang='scss' scoped>
.cart {
    position: fixed;
    z-index: 21;
    bottom: 0;
    width: 100%;
    & .cart-num {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        background: #fff;
        padding: 0px 16px;
        >div {
            display: flex;
            align-items: center;
            & .van-stepper {
                margin-right: 8px;
            }
            & span{
                font-size: 18px;
            }
        }
        >div:nth-child(2) {
            & span {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #d2d2d2;
                background: #fff;
                width: 28px;
                height: 28px;
                font-size: 16px;
                border-radius: 2px;
            }
            & span.active {
                background: #dc3b40;
                color: #fff;
            }
        }
    }
    & .basket {
        display:flex;
        height: 50px;
        background: #000;
        color: #fff;
        & .basket-left{
            padding-left: 16px;
            width:70%;
            display: flex;
            align-items: center;
            background: #fb6a6f;
            & i{
                font-size: 22px;
                margin-right:10px;
            }
            > div{
                & p:nth-child(1){
                    font-size: 16px;
                    margin: 0px;
                } 
                & p:nth-child(2){
                    margin: 0px;
                    width: 182px;
                    white-space:nowrap; 
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    & span{
                        margin-right:4px;
                    }
                }
            }
            
        }
        & .basket-left.active{
            background: #dc3b40;
        }
        & .basket-right{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
            background: #a4a4a4;
            font-size: 18px;
            & i{
                font-size: 22px;
                margin-right: 10px;
            }
        }
        & .basket-right.active{
            background: #000;
        }
    }
}
</style>
