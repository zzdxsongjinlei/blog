import { BuildFilled,BarChartOutlined,ProfileFilled,FileFilled,EditFilled,FileAddFilled,BookFilled,VideoCameraFilled,FlagFilled ,MessageFilled  } from '@ant-design/icons';

const menus =  [
  {
    path: '/',
    title: '仪表盘',
    breadcrumbName: 'home',
    icon: BarChartOutlined,
    role: 1 // 所有人都可见
  },
  {
    path: '/article',
    title: '分享管理',
    breadcrumbName: 'article',
    icon: ProfileFilled,
    role: 1,
    children: [
      {
        path: '/article/list',
        title: '分享列表',
        breadcrumbName: 'article/list',
        icon: FileFilled,
        role: 1,
      },
      {
        path: '/article/edit',
        title: '分享修改',
        breadcrumbName: 'article/edit',
        icon: EditFilled,
        role: 1,
      },
      {
        path: '/article/add',
        title: '分享添加',
        breadcrumbName: 'article/add',
        icon: FileAddFilled,
        role: 1,
      }
    ]
  },
  {
    path: '/demo',
    title: 'Demo管理',
    breadcrumbName: 'demo',
    icon: BuildFilled,
    role: 1,
    children: [
      {
        path: '/demo/list',
        title: 'Demo列表',
        breadcrumbName: 'demo/list',
        icon: FileFilled,
        role: 1,
      },
      {
        path: '/demo/edit',
        title: 'Demo修改',
        breadcrumbName: 'demo/edit',
        icon: EditFilled,
        role: 1,
      },
      {
        path: '/demo/add',
        title: 'Demo添加',
        breadcrumbName: 'demo/add',
        icon: FileAddFilled,
        role: 1,
      }
    ]
  },
  {
    path: '/book',
    title: '体会管理',
    breadcrumbName: 'book',
    icon: BookFilled,
    role: 1,
    children: [
      {
        path: '/book/list',
        title: '体会列表',
        breadcrumbName: 'book/list',
        icon: FileFilled,
        role: 1,
      },
      {
        path: '/book/edit',
        title: '体会修改',
        breadcrumbName: 'book/edit',
        icon: EditFilled,
        role: 1,
      },
      {
        path: '/book/add',
        title: '添加体会',
        breadcrumbName: 'book/add',
        icon: FileAddFilled,
        role: 1,
      }
    ]
  },
  {
    path: '/life',
    title: '琐事管理',
    breadcrumbName: 'life',
    icon: VideoCameraFilled,
    role: 1,
    children: [
      {
        path: '/life/list',
        title: '琐事列表',
        breadcrumbName: 'life/list',
        icon: FileFilled,
        role: 1,
      },
      {
        path: '/life/edit',
        title: '琐事修改',
        breadcrumbName: 'life/edit',
        icon: EditFilled,
        role: 1,
      },
      {
        path: '/life/add',
        title: '添加琐事',
        breadcrumbName: 'life/add',
        icon: FileAddFilled,
        role: 1,
      }
    ]
  },
  {
    path: '/resources',
    title: '资源管理',
    breadcrumbName: 'resources',
    icon: FlagFilled ,
    role: 1,
    children: [
      {
        path: '/resources/list',
        title: '资源列表',
        breadcrumbName: 'resources/list',
        icon: FileFilled,
        role: 1,
      },
      {
        path: '/resources/edit',
        title: '资源修改',
        breadcrumbName: 'resources/edit',
        icon: EditFilled,
        role: 1,
      },
      {
        path: '/resources/add',
        title: '添加资源',
        breadcrumbName: 'resources/add',
        icon: FileAddFilled,
        role: 1,
      }
    ]
  },
  {
    path: '/notice',
    title: '公告管理',
    breadcrumbName: 'notice',
    icon: MessageFilled ,
    role: 1,
    children: [
      {
        path: '/notice/list',
        title: '公告列表',
        breadcrumbName: 'notice/list',
        icon: FileFilled,
        role: 1,
      },
      {
        path: '/notice/edit',
        title: '公告修改',
        breadcrumbName: 'notice/edit',
        icon: EditFilled,
        role: 1,
      },
      {
        path: '/notice/add',
        title: '添加公告',
        breadcrumbName: 'notice/add',
        icon: FileAddFilled,
        role: 1,
      }
    ]
  }  
]

export default menus













