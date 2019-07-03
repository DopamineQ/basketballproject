define(['jquery'], function() {
    class Header {
        constructor () {
            this.container = $('header')
            this.init()
        }
        init() {
            return new Promise(resolve => {
                this.container.load('/html/module/header.html',resolve)
            })
        }
    } 
    return new Header()
});