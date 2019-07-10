require(['./config'], function () {
    require(['aside'], () => {
        class Register {
            constructor () {
                this.name = $('#user-name')
                this.pwd = $('#user-pwd')
                this.btn = $('#register-btn')
                //console.log(this.userName,this.passWord,this.btn)
                this.bindEvent()
                
            }

            //绑事件
            bindEvent() {
                let _this = this
                this.btn.click( function () {
                    let name = _this.name.val()
                    let pwd = _this.pwd.val()
                    let info = localStorage.getItem('register')
                    if(info){
                        
                        info = JSON.parse(info)
                        // console.log(info)
                        let arr2 = info.some( (item) => {
                            return item.userName === name
                        })
                        // console.log (arr2)
                        if(arr2){
                            alert("该用户名已经存在啦")
                        }else{
                            let newRegister = {userName:name,passWord:pwd}
          
                            info.push(
                                {
                                    ...newRegister
                                }
                            )
                            localStorage.setItem('register', JSON.stringify(info))
                            alert('注册成功，即将跳转登录页面')
                            window.location.href = '/html/login.html'
                        }
                    }else{
                        let register = {
                            userName: name,
                            passWord:pwd
                        } 
                        let arr = [
                            {...register}
                        ]
                    localStorage.setItem('register', JSON.stringify(arr))
                    alert('注册成功，即将跳转登录页面')
                    window.location.href = '/html/login.html'
                    }
                })
            }
        }
        new Register()
    })
})