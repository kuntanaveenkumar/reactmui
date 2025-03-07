import React, { Suspense, useState, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
const MyBox = lazy(() => import('../components/common/Box'));
const CustomCssBaseline = lazy(() => import('../components/common/CssBaseline'));
import { PUBLIC_DIR } from '../constants/appConstants';
import CustomErrorBoundary from "../components/errors/CustomErrorBoundary"
import { LeftBarContext } from '../contexts/LeftBarContext'
import Components from './Link'
const MainLayout = () => {
  const [token, setToken] = useState(null);
  const [contextValue, setContextValue] = useState(false);
  const location = useLocation();
  const hideBar = [`${PUBLIC_DIR}index`, PUBLIC_DIR, `${PUBLIC_DIR}login`, `${PUBLIC_DIR}main`, `${PUBLIC_DIR}main/`].includes(location.pathname);
  const hideDisplayFlex = [`${PUBLIC_DIR}main`].includes(location.pathname);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomErrorBoundary>
        <LeftBarContext.Provider value={{ contextValue, setContextValue }}>
          <MyBox sx={hideDisplayFlex ? {} : { display: 'flex' }}>
            <CustomCssBaseline />
            {!hideBar ?
              <><Components.MenuBar.component /><Components.LeftBar.component /></> : ""}
            <Routes>
              <Route path={`${PUBLIC_DIR}index`} element={<Components.Login.component />} />
              <Route path={`${PUBLIC_DIR}main`} element={<Components.Main.component />} />
              <Route path={`${PUBLIC_DIR}home`} element={<Components.Home.component />} />
              <Route path={`${PUBLIC_DIR}locations`} element={<Components.Locations.component />} />
              <Route path={`${PUBLIC_DIR}index`} element={<Components.Login.component />} />
              <Route path={`${PUBLIC_DIR}login`} element={<Components.Login.component />} />
              <Route path={`${PUBLIC_DIR}`} element={<Components.Login.component />} />
            </Routes>
          </MyBox>
        </LeftBarContext.Provider>
      </CustomErrorBoundary>
    </Suspense>
  );
};
export default MainLayout;
