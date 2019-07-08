require(['./config'], function () {
    require(['template', 'header', 'footer','aside'], (template, header) => {
        class Cart{
            constructor () {
                this.container = $('#cart-box')
                this.totalPrice = $('.totalPrice')
                this.yuanjia = $('.yuanjia')
                this.allCheck = $('.all-check-box')
                this.init()
                this.calcMoney()
                this.checkChange()
                this.allCheckChange()
                this.plusBtn()
                this.minusBtn()
                this.delete()
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

                //一上来的时候默认就要判断是否全选
                let isAllCheck = this.cart.every(shop => {
                    return shop.check === true
                })
                this.allCheck.prop('checked', isAllCheck)

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
                this.totalPrice.html(this.money.toFixed(2))
                this.yuanjia.html(this.money.toFixed(2))
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
                    //判断是否全选
                    //判断_this.cart的每一条数据是否都为选中状态
                    let isAllCheck = _this.cart.every(shop => {
                        return shop.check === true
                    })
                    _this.allCheck.prop('checked', isAllCheck)
                })
            }

            allCheckChange () {
                let _this = this
                this.allCheck.on('change', function () {
                    //得到全选按钮的状态 isCheck 的状态为true或者false
                    let isCheck = $(this).prop('checked')
                    //数据和所有单选都应该按照这个isCheck来修改
                    _this.cart = _this.cart.map(shop => {
                        shop.check = isCheck
                        return shop
                    })
                    //把每一个都单选都要切换checked，但jQuery内部已经做好循环过程了，所以只要写下面一句
                    $('.check-box').prop('checked', isCheck)
                    //重新计算总价
                    _this.calcMoney()
                })
            }

            //给加减绑事件 事件委托 点了按钮后 1.找父级的tr 找id 将num++或者-- 先改数据
            plusBtn () {
                let _this = this
                this.container.on('click', '.count_plus', function () {
                    const id = $(this).parents('li').attr('data-id')
                    // //console.log(id)
                    _this.cart = _this.cart.map( (shop) => {
                        if(shop.id === id) {
                           shop.num++
                        }
                        return shop
                    })
                    //console.log(_this.cart)
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    _this.init()
                    header.calcTotalNum()
                    _this.calcMoney ()

                })
            }

            minusBtn () {
                let _this = this 
                this.container.on('click', '.count_minus', function () {
                    const id = $(this).parents('li').attr('data-id')
                    _this.cart = _this.cart.map( (shop) => {
                        if(shop.id === id){
                            shop.num--
                            if(shop.num === 0) shop.num = 1
                        }
                        return shop
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    _this.init()
                    header.calcTotalNum()
                    _this.calcMoney ()
                })

            }

            //删除 也是先找id 然后将从数据删了 然后再将dom移除 
            delete () {
                let _this = this
                this.container.on('click', '.sc', function () {
                    const id = $(this).parents('li').attr('data-id')
                    _this.cart = _this.cart.filter( (shop) => {
                        if(shop.id === id) {

                        }else{
                            return shop
                        }
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    _this.init()
                    header.calcTotalNum()
                    _this.calcMoney ()
                })
            }
            //做完加减删除要调用一下header.calcTotalNum()
        }
        new Cart()
    })
})