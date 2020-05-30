import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const RegisterWithFarm = () => import('@/views/pages/RegisterWithFarm')
const Forget = () => import('@/views/pages/Forget')
const ValidOTP = () => import('@/views/pages/ValidOTP')
const ChangePassword = () => import('@/views/pages/ChangePassword')
const EditProfile = () => import('@/views/profile/EditProfile')
const Homepage = () => import('@/views/pages/Homepage')
const AboutMe = () => import('@/views/pages/AboutMe')
const Contact = () => import('@/views/pages/Contact')

Vue.use(Router)

export default new Router({
  
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/dashboard',
      redirect: '/dashboard/welcome',
      name: 'Dashboard',
      component: DefaultContainer,
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: Dashboard
        },
        {
          path: 'edit-profile',
          name: 'edit-profile',
          component: EditProfile
        },
      ]
    },
    {
      path: '/',
      redirect: '/homepage',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
        {
          path: 'register-with-farm',
          name: 'RegisterWithFarm',
          component: RegisterWithFarm
        },
        {
          path: 'forget',
          name: 'Forget',
          component: Forget
        },
        {
          path: 'valid-otp',
          name: 'ValidOTP',
          component: ValidOTP
        },
        {
          path: 'change-password',
          name: 'ChangePassword',
          component: ChangePassword
        },
        {
          path: 'homepage',
          name: 'Homepage',
          component: Homepage
        },
        {
          path: 'aboutme',
          name: 'AboutMe',
          component: AboutMe
        },
        {
          path: 'contact',
          name: 'Contact',
          component: Contact
        }
      ]
    },
    { path: '*', component: Page404 }
  ],
})
