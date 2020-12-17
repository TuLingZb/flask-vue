/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nestedRouter = {
  path: '/sample',
  component: Layout,
  redirect: '/sample/prestorage',
  name: 'Sample',
  meta: {
    title: '样本管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'prestorage',
      name: 'prestorage',
      component: () => import('@/views/table/sample-table/index'),
      meta: { title: '录入样本信息' }
    },
    {
      path: 'storaged',
      name: 'storaged',
      component: () => import('@/views/table/disease-table/index'),
      meta: { title: '录入疾病信息' }
    },
    {
      path: 'archived',
      name: 'archived',
      component: () => import('@/views/table/patient-table/index'),
      meta: { title: '录入样本来源' }
    },
    {
      path: 'results',
      name: 'results',
      component: () => import('@/views/table/result-table/index'),
      meta: { title: '样本测序结果' }
    },
  ]
}

export default nestedRouter
