require(['./config'], function () {
    require(['template', 'url', 'header', 'footer','aside', 'zoom', 'fly'], function (template, url) {
        class Info {
            constructor () {
                this.container = $('#detail-info')
                this.imgContainer = $('#detail-img')
                //addToCart方法在这里调用的话就要用时间委托，在then里调用的话就不用了 
                //因为加入购物车按钮是在模板里请求过来的 是异步的
                this.addToCart()
                this.getData().then(detail => {
                    this.renderDetail(detail)
                })
            }

            getData () {
                //取到id值 请求接口
                const id = window.location.search.slice(4)
                // console.log(id)
                return new Promise(resolve => {
                    $.get(`${url.rapBaseUrl}/shop/detail`, { id }, resp => {
                        if (resp.code === 200) {
                            const {detail} = resp.body
                        //由rap2不能处理请求的时候携带的id，所以返回的数据里没有id,
                        //所以我们手动给detail加上id字段(只有使用rap2的时候需要，上线之后这行代码是不需要的)
                            detail.id = id
                            //存在this身上，这样的话别的方法，（比如加入购物车）直接获取当前商品信息
                            this.detail = detail
                            // detail = {
                            //     ...detail,
                            //     id
                            // }
                            resolve(detail)
                        }
                    })
                })

            }

            renderDetail (detail) {
                //根据商品详细信息information渲染页面
                console.log(detail)
                let str = template('list-template',{ detail })
                this.container.html(str)

                //图片渲染
                //第二个参数是template需要的数据，在template里面写的字段名叫data
                //对应的值就是从后端获取到的detail对象
                let str2 = template('img-template', { data: detail })
                // console.log(str2)
                this.imgContainer.html(str2)
                this.zoomImg()
            }

            zoomImg () {
                $('.zoom-img').elevateZoom({
                    gallery: 'kunsile', // ul父级盒子的id
                    cursor: 'pointer',
                    borderSize: '1',
                    galleryActiceClass: 'active',
                    borderColor: '#f2f2f2'
                })
            }

            addToCart () {
                let _this = this
                //给添加购物车按钮绑定事件(事件委托来做 委托给页面一开始就存在的容器盒子)
                $('.product-choice').on('click', '.link2', function (e) {
                    
                    //飞入购物车
                    const src = _this.detail.images[0]
                    $(`<img src="${src}" style="width:35px; height:35px; border-radius:50%; positive:relative; z-index:1000 ">`).fly({
                        start: {
                            left: e.clientX,
                            top:  e.clientY
                        },
                        end: {
                            left: $('.shop-cart')[0].getBoundingClientRect().left,
                            top: $('.shop-cart')[0].getBoundingClientRect().top,
                            width:0,
                            height:0
                        },
                        onEnd: function () {
                            this.destroy()
                            //动画完成 购物车数量加一
                            let num = parseInt($('.shop-cart .cart-num').html())
                            // console.log(num)
                            num++
                            $('.shop-cart .cart-num').html(num)
                            
                        }
                    })

                    //商品加入购物车
                    //把当前商品存入localstorage
                    // let str = JSON.stringify(_this.detail)
                    // localStorage.setItem('cart', str)

                    //先取出来 判断是否为空
                    let allCart = localStorage.getItem('cart')
                    if (allCart) {
                        //说明购物车已经有数据了
                        //从localStorage里取出来的是json字符串,所以需要转换一下
                        allCart = JSON.parse(allCart)
                        console.log(allCart)
                        //判断allCart里面是否存在当前商品 用some方法
                        const isExist = allCart.some(shop => {
                            return shop.id === _this.detail.id
                        })
                        if(isExist){
                            //当前商品已经加入过购物车了，则将这条商品的num++就可以了
                            // allCart.forEach(shop => { //foreach在原数组修改 不推荐操作原数组 map方法返回新数组
                            //     if(shop.id === _this.detail.id) shop.num++
                            // });
                            allCart = allCart.map(shop => {
                                if(shop.id === _this.detail.id) shop.num++
                                //map这个方法每次循环都要有一个返回值，这些返回值会构成一个新的数组，就是整个map的结果
                                return shop
                            })
                            //修改完成之后重新存一次，把之前的覆盖掉
                            // localStorage.setItem('cart', JSON.stringify(allCart))
                        }else{
                            //购物车有数据 但不是当前这一条
                            //把当前商品push进去就可以了
                            allCart.push({
                                ..._this.detail,
                                num:1
                            })
                            // localStorage.setItem('cart', JSON.stringify(allCart))
                        }
                        //不管走if还是else 都要重新存 所以放在外面
                        localStorage.setItem('cart', JSON.stringify(allCart))
                    }else{
                        //购物车没有数据 为空
                        //把当前的数据构造出一个数组（length为1），存进去且默认要有一个num字段（一般为1或者页面上显示的数量）来记录数量
                        let arr = [
                            {
                                ..._this.detail,
                                num:1
                            }
                        ]
                        //把这个数据转成json字符串然后存到localstorage
                        localStorage.setItem('cart', JSON.stringify(arr))
                    }
                })            
            }
        }
        new Info()
    })
})