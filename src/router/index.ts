import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SecurityCamMapView from '../views/SecurityCamMapView.vue'
import UploadImageView from '../views/UploadImageView.vue'
import UploadImageView2 from '../views/UploadImageView2.vue'
import PolicyView from '../views/PolicyView.vue'
import PolicyView2 from '../views/PolicyView2.vue'
import IntegralView from '../views/IntegralView.vue'
import DashCamMapView from '../views/DashCamMapView.vue'
import ReportView from '../views/ReportView.vue'
import Expand from '../views/ExpandView.vue'
import MonitorExpand from '../views/MonitorExpandView.vue'
import DetailsPage from '../views/DetailsPage.vue';
import MonitorDetailsPage from '../views/MonitorDetailsPage.vue';
import VideoReport from '../views/VideoReport.vue';  

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: '城市通' },
      component: HomeView
    },
    // {
    //   path: '/league',
    //   name: 'league',
    //   meta: { title: '交通互助聯盟' },
    //   component: HomeView
    // },
    {
      path: '/security-cam-map',
      name: 'security-cam-map',
      meta: { title: '監視器地圖' },
      component: SecurityCamMapView
    },
    {
      path: '/dash-cam-map',
      name: 'dash-cam-map',
      meta: { title: '行車紀錄共享地圖' },
      component: DashCamMapView
    },
    {
      path: '/report',
      name: 'report',
      meta: { title: '車禍通報' },
      component: ReportView
    },
    {
      path: '/upload',
      name: 'upload',
      meta: { title: '上傳事故影像' },
      component: UploadImageView
    },
    {
      path: '/upload2',
      name: 'upload2',
      meta: { title: '上傳事故影像' },
      component: UploadImageView2
    },
    {
      path: '/policy',
      name: 'policy',
      meta: { title: '交通互助聯盟' },
      component: PolicyView
    },
    {
      path: '/policy2',
      name: 'policy2',
      meta: { title: '交通互助聯盟' },
      component: PolicyView2
    },
    {
      path: '/integral',
      name: 'integral',
      meta: { title: '聯盟榮譽積分' },
      component: IntegralView
    },
    {
      path: '/expand',
      name: 'expand',
      meta: { title: '展開列表' },
      component: Expand
    },
    {
      path: '/videoreport',
      name: 'videoreport',
      meta: { title: '影像協尋回報' },
      component: VideoReport 
    },
    {
      path: '/monitorexpand',
      name: 'monitorexpand',
      meta: { title: '監視器展開列表' },
      component: MonitorExpand
    },
    {
      path: '/details/:id',
      name: 'DetailsPage', // 確保這個名稱與 router.push 中一致
      component: DetailsPage,
      props: true // 允許將路由參數作為 props 傳遞
    },
    {
      path: '/details/:monitor_id',
      name: 'monitorDetails',
      component: MonitorDetailsPage,
      props: true // 將路由參數作為組件的 props 傳遞
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string
  } else {
    document.title = '城市通'
  }
  next()
})

export default router
