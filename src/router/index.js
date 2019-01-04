import Vue from 'vue'
import Router from 'vue-router'


const Readbook = () => import ('../pages/readbook')
const Readdemo = () => import ('../pages/readdemo')
const Readmore = () => import ('../pages/readmore')
const Home = () => import('../pages/home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home',
    },
    {
      path:'/home',
      component:Home,
      children:[
        {
          path:'',
          redirect:'readdemo'
        },
        {
          name:'readdemo',
          path:'readdemo',
          component:Readdemo
        },
        {
          name:'readbook',
          path:'readbook',
          component:Readbook
        },
        {
          name:'readmore',
          path:'readmore',
          component:Readmore
        }
      ]
    }
  ]
})
