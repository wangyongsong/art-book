import React from 'react';

export interface IRouteBase {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta: IRouteMeta;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
}

export interface IRouteMeta {
  title: string;
  icon?: string;
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: '/',
    component: React.lazy(() => import('../pages/layout/index')),
    meta: {
      title: '系统',
    },
    children: [
      {
        path: '/home',
        meta: {
          title: '首页',
          icon: 'home',
        },
        component: React.lazy(() => import('../pages/home/index')),
        redirect: '/home',
      },
      {
        path: '/about',
        meta: {
          title: '首页',
          icon: 'about',
        },
        component: React.lazy(() => import('../pages/about/index')),
        redirect: '/about',
      },
    ],
    redirect: '/',
  },
];

export default routes;
