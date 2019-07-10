require.config({
    baseUrl: '/',
    paths: {
        jquery:'libs/jquery/jquery-1.11.3.min', 
        header:'js/module/header',
        footer:'js/module/footer',
        aside:'js/module/aside',
        template:'libs/art-template/template-web',
        url:'js/module/url',
        zoom:'libs/jquery-plugins/jquery.elevateZoom-3.0.8.min',
        fly:'libs/jquery-plugins/jquery.fly',
        cookie:'libs/jquery-plugins/jquery.cookie'
    },
    //垫片
    //一些不满足AMD规范但是又依赖别的模块
    shim: {
        zoom: {
            deps: ['jquery']
        },

        fly: {
            deps: ['jquery']
        },
        cookie: {
            deps: ['jquery']
        }
    }
})