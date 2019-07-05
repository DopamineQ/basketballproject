require(['./config'], function () {
    require(['template', 'header', 'footer','aside'], (template) => {
        class Cart{
            constructor () {
                this.container = $('#cart-box')
                this.totalPrice = $('.totalPrice')
                this.init()
                this.calcMoney ()
                this.checkChange ()
            }

            init () {
                //取数据，渲染模板，显示在页面上
                this.cart = JSON.parse(localStorage.getItem('cart'))
                //判断是否为空？如果为空就不渲染模板 而是给用户显示为空的界面
                if(this.cart) {
                    let str = template('template-cart', {cart: this.cart})
                    this.container.html(str)
                }else{
                    this.container.html("<a href='/' style='display:block; color:green; font-size:25px; text-align:center'>快去买东西吧！</a>")
                }
            }

            calcMoney () {
                //负责计算总价
                //每次都重新计算，所以要清零
                this.money = 0
                //直接根据this.cart数据来计算
                this.money = this.cart.reduce( (money, shop) => {
                    if(shop.check){
                        money += shop.num * shop.price
                    }
                    return money
                }, 0)
                //显示在总计里
                this.totalPrice.html(this.money)
            }

            checkChange () {
                let _this = this
                //给container事件委托 来触发单选的状态改变
                this.container.on('change', '.check-box', function () {
                    //从this出发 找到祖先级li 从li的自定义属性上找到id
                    const id = $(this).parents('li').attr('data-id')
                    console.log(id)
                    //根据id值改变数据
                    _this.cart = _this.cart.map(shop => {
                        if(shop.id === id) {
                            //$(this).prop('checked') 得到的是当前input选框的状态 选中就是true 没选中就是false
                            shop.check = $(this).prop('checked')
                        }
                        return shop
                    })
                    //将修改过后的cart数据重新存localstorage
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    //调用一次计算总价的方法
                    _this.calcMoney()
                })
            }
        }
        new Cart()
    })
})