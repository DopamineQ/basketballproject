define(['jquery'], function() {
    class Header {
        constructor () {
            this.container = $('header')
            this.init().then( () => {
                //因为购物车的DOM是加载进去的（异步），所以我们要在then里面获取
                this.cartWrap = $('.cart-num')
                //console.log(this.cartWrap)
                this.calcTotalNum()
            })
        }
        init() {
            return new Promise(resolve => {
                this.container.load('/html/module/header.html',resolve)
            })
        }

        //计算购物车的总数量
        calcTotalNum () {
            let cart = localStorage.getItem('cart')
            if (cart){
                cart = JSON.parse(cart)
                //总种类 || 总数量
                let totalNum = cart.reduce( (num, shop) => {
                    num += shop.num
                    return num
                },0)
                this.cartWrap.html(totalNum)
            }else{
                this.cartWrap.html(0)
            }
        }
    } 
    return new Header()
});