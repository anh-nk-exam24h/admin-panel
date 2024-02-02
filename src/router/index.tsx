import { Fragment, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getConfigWithRole, getConstant, getUserinfo } from 'api';
import BaseLayout from 'layout/base';
import { UserData } from 'store/selector';
import { RouteType } from 'types';

import Loading from 'components/elements/Loading';

import { PrivateRouter } from './private';
import { PublicRouter } from './public';

const Router = () => {
  const dispatch = useDispatch();
  const authDataRedux = useSelector(UserData);
  const token = localStorage.getItem('tk');
  // if (token || authDataRedux?.dataUser?.token) {
  //   dispatch(getConstant());
  //   dispatch(getUserinfo());
  //   dispatch(getConfigWithRole());
  // }
  const checkLayout = (route: RouteType) => {
    let Layout = BaseLayout;
    if (route.layout) {
      Layout = route.layout;
    } else if (route.layout === null) {
      Layout = Fragment;
    }
    return Layout;
  };
  return (
    <Routes>
      {token || authDataRedux?.dataUser?.token
        ? PrivateRouter.map((route: RouteType, index: number) => {
            const Container = route.element;
            const Layout = checkLayout(route);
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Container />
                    </Suspense>
                  </Layout>
                }
              />
            );
          })
        : PublicRouter.map((route, index) => {
            const Container = route.element;
            const Layout = checkLayout(route);
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Container />
                    </Suspense>
                  </Layout>
                }
              />
            );
          })}
    </Routes>
  );
};

export default Router;
