//首先在ul里写一个静态的li调好样式
//把li的内容抽离出来放到一个script标签里面
//然后加上{{each list item }} {{/each}}
//把li里的数据改成接口返回的那些对应字段名，比如 <h3>{{item.title}}</h3>
//template模块的配置
//接口取到数据以后调用template方法，让list数据传递进去，得到根据数据渲染的html字符串
//最后把这个渲染完成的字符串放到ul里
require(['./config'], function () {
    require(['template','url', 'header', 'footer','aside'],(template, url) => {
        //所有商品页面功能逻辑 
        class All {
            constructor () {
                this.container = $('#product-list-box')
                this.getData().then( (list) => {
                    //参数两层传递 首先then里面接受了resolve传递过来的list数据，紧接着继续传递给renderList
                    this.renderList(list)
                })
            }
            // init () {
            //     //ajax请求后端接口 拿到列表数据
            //     $.get('http://rap2api.taobao.org/app/mock/223505/shop/all-list', resp => {
            //         // console.log(resp)
            //     //调用template这个方法 第一个参数就是script的id（不带#），第二个参数是当前模板需要的数据
            //         let str = template('list-template', { list: resp.body.list })
            //         this.container.html(str)
            //     })
            // }
            getData () {
                return new Promise (resolve => {
                    //$.get('http://rap2api.taobao.org/app/mock/223505/shop/all-list', resolve)中的resolve
                    //不能加括号,所以写个匿名函数在里面调用resolve 然后就可以传参了 
                    $.get(url.rapBaseUrl + '/shop/all-list', (resp) => {
                        if(resp.code === 200){
                            //传递实参把从接口取到的数据传递给then
                            resolve(resp.body.list)
                        }
                    })
                })
            }

            renderList (list) {
                //let str = template('list-template', { list: list })
                //第一个list是key 指的是template中需要的变量名
                //第二个list是value 指的是传递过来的从接口获取的值 
                let str = template('list-template', { list })
                this.container.html(str)
            }

            
        }
        new All()
    })
})