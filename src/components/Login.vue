<template>
    <div class="blog-login">
        <br>
        <b-container>
            <b-row>
                <b-col md="6" offset-md="3">
                    <b-overlay :show="loading">
                        <b-alert show variant="warning" dismissible>需要验证身份</b-alert>
                        <b-input-group prepend="账号" class="mt-3">
                            <b-form-input v-model.trim="username"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="密码" class="mt-3">
                            <b-form-input type="password" v-model.trim="password"></b-form-input>
                        </b-input-group>
                        <b-button block variant="primary" class="mt-3" @click="login">登录</b-button>
                    </b-overlay>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            // 账号
            username: '',
            // 密码
            password: '',
            // 重定向
            redirect: this.$route.query.redirect || '/',
            // 加载中
            loading: false
        }
    },
    methods: {
        // 登录
        login() {
            if (!this.username || this.username.length < 2) {
                this.$bvToast.toast('账号格式错误')
                return
            }
            if (!this.password || this.password.length < 2) {
                this.$bvToast.toast('密码格式错误')
                return
            }
            const params = {
                username: this.username,
                password: this.password
            }
            this.loading = true
            this.$http.post('/login', params).then(res => {
                this.loading = false
                if (res.code === 0) {
                    sessionStorage.setItem('blog-token', res.data)
                    this.$router.replace({
                        path: this.redirect
                    })
                } else {
                    this.$bvToast.toast(res.msg)
                }
            }).catch(err => {
                this.loading = false
                console.log(err)
            })
        }
    }
}
</script>
