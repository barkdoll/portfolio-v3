import Vue from 'vue';
import router from './router';
import Nav from './components/Nav';
import App from './App';

Vue.use(require('vue-script2'));

// eslint-disable-next-line
const vm = new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: {
    App,
    Nav,
  },
});
