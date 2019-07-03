define(['jquery'], function() {
    class Aside {
        constructor () {
            this.container = $('aside')
            this.init()
        }
        init() {
            return new Promise(resolve => {
                this.container.load('/html/module/aside.html',resolve)
            })
        }
    } 
    return new Aside()
});