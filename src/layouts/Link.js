import React, { lazy } from 'react';
const Components = {
  LeftBar: { component: lazy(() => import('../components/Leftbar')), path: '/leftbar' },
  MenuBar: { component: lazy(() => import('../components/Menubar')), path: '/menubar' },
  Login: { component: lazy(() => import('../components/login/Login')), path: '/login' },
  Locations:{ component: lazy(() => import('../components/locations/Locations')), path: '/locations' },
  Main: { component: lazy(() => import('../components/Main')), path: '/main' }
};
export default Components;
