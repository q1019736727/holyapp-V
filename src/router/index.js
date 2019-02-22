import Vue from 'vue'
import Router from 'vue-router'
import Tabbars from '../components/TabarBottom'
import Topheader from '../components/topheader'
import One from '../components/PageOne'
import Two from '../components/PageTwo'
import Three from '../components/PageThree'
import Four from '../components/PageFour'
import ActivityDetail from '@/components/ActivityDetail'
//引入vux的默认样式
import 'vux/src/styles/reset.less'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tabbars',
      components: {
        main:Tabbars,
        top:Topheader,
        one:One,//首页
        two:Two,//管家
        three:Three,//活动
        four:Four//我的
      }
    },
    {
      path: '/detail',
      name: 'detail',
      components:{
        main:ActivityDetail
      }
    }
  ]
})
