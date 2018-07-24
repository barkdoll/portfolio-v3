import Vue from 'vue';
import router from './router';
import App from './App';

// eslint-disable-next-line
const vm = new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: {
    App
  },
});
