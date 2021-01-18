import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {
  LayoutPlugin,
  AlertPlugin,
  InputGroupPlugin,
  FormInputPlugin,
  ButtonPlugin,
  ToastPlugin,
  OverlayPlugin,
  NavbarPlugin,
  CollapsePlugin,
  JumbotronPlugin,
  CardPlugin,
  ListGroupPlugin,
  LinkPlugin,
  BadgePlugin,
  FormPlugin,
  FormGroupPlugin,
  FormTextareaPlugin,
  ModalPlugin,
  FormTagsPlugin,
  FormSelectPlugin,
  FormFilePlugin,
  ProgressPlugin,
  PaginationPlugin
} from 'bootstrap-vue'
Vue.use(LayoutPlugin)
Vue.use(AlertPlugin)
Vue.use(InputGroupPlugin)
Vue.use(FormInputPlugin)
Vue.use(ButtonPlugin)
Vue.use(ToastPlugin)
Vue.use(OverlayPlugin)
Vue.use(NavbarPlugin)
Vue.use(CollapsePlugin)
Vue.use(JumbotronPlugin)
Vue.use(CardPlugin)
Vue.use(ListGroupPlugin)
Vue.use(LinkPlugin)
Vue.use(BadgePlugin)
Vue.use(FormPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(ModalPlugin)
Vue.use(FormTagsPlugin)
Vue.use(FormSelectPlugin)
Vue.use(FormFilePlugin)
Vue.use(ProgressPlugin)
Vue.use(PaginationPlugin)

// 配置ajax
import axios from 'axios'
axios.interceptors.request.use(config => {
  config.headers.authorization = `JWT ${sessionStorage.getItem('blog-token')}`
  return config
})
axios.interceptors.response.use(
  res => res.data,
  err => {
    if (err.response.status === 401) {
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }
)
//axios.defaults.baseURL = 'http://182.92.159.87/api'
axios.defaults.baseURL = 'http://localhost:5000/api'
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
