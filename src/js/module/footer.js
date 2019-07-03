define(['jquery'], function() {
    class Footer {
        constructor () {
            this.container = $('footer')
            this.init()
        }
        init() {
            return new Promise(resolve => {
                this.container.load('/html/module/footer.html',resolve)
            })
        }
    } 
    return new Footer()
});