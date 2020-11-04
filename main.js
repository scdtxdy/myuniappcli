import Vue from 'vue'
import App from './App'
//vuex
import store from "./store";

import cuCustom from './colorui/components/cu-custom.vue'

import {http} from './utils/service.js'
Vue.prototype.$api=http;

import MescrollBody from "./components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "./components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.component('cu-custom', cuCustom)

const app = new Vue({
    ...App,
	store
})
app.$mount()
