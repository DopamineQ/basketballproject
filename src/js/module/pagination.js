define(['jquery'], function() {
   class Pagination {
    constructor () {
        this.container = $('.pagination')
    }

    init () {
        return new Promise((resolve) => {
            this.container.load('/html/module/pagination.html',resolve)
        })
    }
   }
   new Pagination()
    
});