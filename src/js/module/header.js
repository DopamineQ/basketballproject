define(['template', 'jquery','cookie'], function(template) {
    class Header {
        constructor () {
            this.container = $('header')
            this.init().then( () => {
                //因为购物车的DOM是加载进去的（异步），所以我们要在then里面获取
                this.cartWrap = $('.cart-num')
                //console.log(this.cartWrap)
                this.calcTotalNum()
                this.logined () 
                this.cancel()
                this.searchInput()

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

        logined () {
            //console.log($.cookie('username'))
            let userInfo = $.cookie('username')
            console.log(userInfo)
            if(userInfo == undefined){
                $('#welcome').hide()
                $('#already-login-name').hide()
                $('#already-login-name').html(userInfo)
                $('#cancellation').hide()
                $('#denglu').show()
                $('#zhuce').show()
            }else{
                if(userInfo == 'null') {
                    $('#welcome').hide()
                    $('#already-login-name').hide()
                    $('#already-login-name').html(userInfo)
                    $('#cancellation').hide()
                    $('#denglu').show()
                    $('#zhuce').show()
                }else{
                    $('#welcome').show()
                    $('#already-login-name').show()
                    $('#already-login-name').html(userInfo)
                    $('#cancellation').show()
                    $('#denglu').hide()
                    $('#zhuce').hide()
                }
            }
        }

        cancel() {
            $('#cancellation').click(function () {
                $.cookie('username', 'null')
                window.location.reload()
            })
            this.logined()
        }
        //头部搜索框 请求百度开放接口
        searchInput () {
            $('.search').on('keyup', function () {
                let inputValue = $(this).val()
                $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${inputValue}&cb=?`,resp =>{
                    let str = template('templateSearch',{list: resp.s})
                    $('.search-value').html(str)
                    $('.search-value').show()
                })

            })

        }

    } 
    return new Header()
});