require(['./config'], function () {
    require(['template', 'url', 'header', 'footer','aside', 'zoom'], function (template, url) {
        class Info {
            constructor () {
                
                this.container = $('#detail-info')
                this.imgContainer = $('#detail-img')
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
        }
        new Info()
    })
})