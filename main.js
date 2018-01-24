import router from './router';

Vue.use(require('vue-script2'));

const vm = new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
});

