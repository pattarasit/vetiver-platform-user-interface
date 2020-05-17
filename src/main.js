// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookies';
import Cleave from 'cleave.js';

Vue.use(VueCookie);
Vue.use(BootstrapVue)

Vue.directive("cleave", {
  inserted: (el, binding) => {
    el.cleave = new Cleave(el, binding.value || {});
  },
  update: el => {
    el.value = el.cleave.properties.result;
    const event = new Event("b-input", { bubbles: true });
    el.dispatchEvent(event);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  data() {
    return {
      alertBox: {
        popup: {
          showAlert: false,
          variant: "danger",
          message: ""
        }
      }
    };
  },
  methods: {
    getAlertBox: function(variant, message,delay) {
      
      delay *= 1000

      this.alertBox.popup.showAlert = true;
      setTimeout(() => {
        this.alertBox.popup.showAlert = false;
      }, delay);
      this.alertBox.popup.variant = variant;
      this.alertBox.popup.message = message;
    },
    clearCookieLogon(){
      this.$cookies.remove("token");
      this.$cookies.remove("logonType");
      this.$cookies.remove("username");
      this.$cookies.remove("logon");
      this.$cookies.remove("roles");
      this.$cookies.remove("logonExpire");
    }
  }
})
