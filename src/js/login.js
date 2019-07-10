require(['./config'], function () {
    require(['jquery'], () => {
        class Login {
            constructor () {
                this.btn = $('#login-btn')
                this.bindEvent()

            }

        
            bindEvent () {
                let _this = this
                this.btn.on('click', function () {
                    console.log(1)
                    let name = $('#user-name').val()
                    let pwd = $('#user-pwd').val()
                    let info = JSON.parse(localStorage.getItem('register'))
                    let isExist = info.some(item => {
                        return item.userName === name && item.passWord === pwd
                    })
                    if (isExist) {
                        
                        let date = new Date()
                        date.setDate(date.getDate() + 7)
                        document.cookie = "username =" + name + ";expires=" + date + ";path=/"
                        alert('登陆成功')
                        window.location.href = "/index.html"
                    }else{
                        $('#user-pwd').val()
                        alert('用户名或密码错误')
                    }
                })
            }
        }
        new Login()
    })
})