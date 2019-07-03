//首先在ul中写一个静态的li调样式
//把li的呢内容抽离出来放到一个script标签里
//然后加上{{each list item}}
//把li里面的数据改成接口返回的那些对应的字段名，比如：<h3>{{item.title}}</h3>
//template模块的配置
//接口取到数据以后调用template方法，将list数据传递出去，得到根据数据渲染的html字符串
//最后把这个渲染完成的字符串放到ul里
require(['./config'], function () {
    require(['template', 'url', 'header', 'footer','aside'], function (template, url) {
        //首页页面的功能逻辑
        class Index {
            constructor () {
                this.container = $('#index-list')
                // this.init()
                this.getData().then( (list) => {
                    //首先 then里面接受了resolve传递过来的list数据，紧接着继续传递给renderList
                    this.renderList(list)


                })
            }

            //此时的init方法将请求数据和渲染数据写在了一起，没有分离，所以后面用promise的方式来写,让每个方法分离！
            // init () {  
            //     1.请求后端端口拿到列表数据
            //     $.get('http://rap2api.taobao.org/app/mock/223505/shop/list', resp => {
            //     // console.log(resp)
            //     //2.调用template方法渲染末班引擎，第一个参数就是script的id(不带#)，第二个参数就是当前模板需要的数据 第二个参数对象里若还需要其他的数据 可以传进去
            //     let str = template('list-template', { list: resp.body.list }) 
            //     console.log(str)
            //     this.container.html(str)
            //     // console.dir(template)
            //     })
            // }

            //获取数据方法
            getData () {
                //请求后端端口拿到列表数据
                //promise写法
                return new Promise(resolve => {
                    $.get(url.rapBaseUrl + '/shop/list', (resp) => {
                        if(resp.code === 200)
                        //传递实参 把从接口取到的数据传递给then
                        resolve(resp.body.list)
                    })
                })
            }

            //渲染数据方法
            renderList (list) {
                //{ list: list }第一个list是template里面需要的变量名名称
                //第二个list是从接口获取的值
                // let str = template('list-template',{ list: list })
                let str = template('list-template',{ list })
                this.container.html(str)
            }

        }
        new Index()
    })
})