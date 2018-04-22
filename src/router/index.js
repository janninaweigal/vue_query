import Vue from 'vue'

import Success from '@/components/Success'
import HomePage from '@/components/HomePage'

const routers=[
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  }
]


export default routers
