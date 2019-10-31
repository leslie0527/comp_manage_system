// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://api.tomorrow979.cn/staff/public/index.php/api/gql',
})
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})
Vue.use(VueApollo)
Vue.config.productionTip = false
Vue.use(ElementUI);


const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  apolloProvider,
  template: '<App/>'
})
