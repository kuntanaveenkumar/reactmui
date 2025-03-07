import React, { useState, useContext, useEffect } from 'react';
import { useDispatch } from "react-redux"
import MyDivider from '../components/common/Divider';
import MyLink from '../components/common/Link';
import { MyList, MyListItem, MyListItemIcon, MyListItemText, MyListItemButton } from '../components/common/List';
import { LeftBarContext } from '../contexts/LeftBarContext';
import CustomDrawer from './common/Drawer';
import Icon from './common/Icon'
import { DrawerHeader, WhiteIconButton } from './common/DrawerHeader';
import { useTranslation } from 'react-i18next';
import { fetchLeftbar } from '../components/slices/leftbarSlice';
import Logo from './Logo';
import { useSelector } from 'react-redux';
import _, { object } from "underscore";
import { setBusinessId } from './slices/businessSlice';
import { setLocationId } from './slices/locationSlice';
import useEntityState from "../components/hooks/useEntityState"
import useGenericData from "../components/hooks/useGenericData"
import Transformtext from './common/Transformtext';
import "../css/Div.less"
import LanguageToggle from "../components/hooks/languageToggle"
import NotificationsIcon from './common/NotificationsIcon'
import { useGetLocationByBusinessQuery } from './services/business';
import MyTypography from './common/Typography';
const drawerWidth = 240;
const LeftBar = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { contextValue, setContextValue } = useContext(LeftBarContext);
  const [lang, setLang] = useState('');
  const [locationState, setLocationState] = useEntityState("locations", -1, "id", "ASC", "");
  const { locations } = locationState;
  const currentPageName = window.location.pathname;
  const [state, setState] = useState({
    locations: locations
  })
  const handleChange = (event, newTab) => {
    const tabId = event.target.id;
    alert(tabId)
    const [businessId, locationId] = tabId
      .replace("simple-tab", "")
      .split('_');
    setTab(newTab);
    dispatch(setLocationId({ 'id': locationId }));
    dispatch(setBusinessId({ 'id': businessId }));
    navigate("/view")
  };
  const handleClick = (event, id) => {

    dispatch(setLocationId({ 'id': id }))
  };
  const [menuList] = useState({
    'VIEW': { icon: <Icon icon="map" />, name: t('leftbar.view'), link: '/view', tab: 0 },
   
  });
  const { business, location } = useSelector(state => ({
    business: state.business,
    location: state.location
  }), _.isEqual);

  const open = useSelector(state => state.open, _.isEqual, false);
  const handleDrawerClose = () => dispatch(fetchLeftbar({ 'open': false }));
  const { data: locationsData, totalCount: locationsCount, refetch: refetchLocations } = useGenericData(
    useGetLocationByBusinessQuery,
    business.business,
    location.location,
    state.locations
  );

  useEffect(() => {
    refetchLocations();
  }, [state, lang]);
  return (
    <CustomDrawer variant="permanent" open={open.open}>
      <DrawerHeader>
        <WhiteIconButton onClick={handleDrawerClose}>
          <Icon icon="chevron-left" />
        </WhiteIconButton>
      </DrawerHeader>
      <MyDivider />
      <MyDivider />
      <MyLink href={`main`} underline="none">
        {open.open && <Logo />} </MyLink>
      <div style={{ textAlign: "center", paddingBottom: "30px" }}>
        <MyTypography value={t('leftbar.welcome')} size="h6" className="whitecolor" />
        <NotificationsIcon className="whitecolor" /><MyLink href={`account`} underline="none">
          Account </MyLink> | <MyLink href={`logout`} underline="none">
          Logout </MyLink>
      </div>
      <MyList>

        {Object.entries(menuList)
          .filter(([key, { tab }]) => tab == 0)
          .map(([key, { icon, name, link, component, tab }]) => (
            <MyListItem key={key} disablePadding sx={{ display: 'block' }}>
              <MyListItemButton sx={{ minHeight: 48, justifyContent: open.open ? 'initial' : 'center', px: 2.5 }} to={link}>
                <MyListItemIcon sx={{ minWidth: 0, mr: open.open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>{icon}</MyListItemIcon>
                <MyListItemText
                  primary={name}
                  sx={{
                    fontSize: '12px',
                    opacity: open.open ? 1 : 0,
                    color: currentPageName.toLowerCase() == link.toLowerCase() ? '#000' : '#fff'
                  }}
                />
              </MyListItemButton>
            </MyListItem>
          ))}

      </MyList>
      <MyDivider />
    
      <MyList>
      <div style={{ height: '50px' }}></div>
        {Object.entries(menuList)
          .filter(([key, { tab }]) => tab == 1)
          .map(([key, { icon, name, link, component, tab }]) => (
            <MyListItem key={key} disablePadding sx={{ display: 'block' }}>
              <MyListItemButton sx={{ minHeight: 48, justifyContent: open.open ? 'initial' : 'center', px: 2.5 }} to={link}>
                <MyListItemIcon sx={{ minWidth: 0, mr: open.open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>{icon}</MyListItemIcon>
                <MyListItemText
                  primary={name}
                  sx={{
                    fontSize: '12px',
                    opacity: open.open ? 1 : 0,
                    color: currentPageName.toLowerCase() == link.toLowerCase() ? '#000' : '#fff'
                  }}
                />
              </MyListItemButton>
            </MyListItem>
          ))}

      </MyList>
      <div style={{ height: '200px' }}></div>
      <MyList>
        {Object.entries(locationsData).map(([key, { location_id, location_name }]) => (
          <MyListItem key={key} disablePadding sx={{ display: 'block' }}>
            <MyListItemButton sx={{ minHeight: 14, justifyContent: open.open ? 'initial' : 'center', px: 2.5 }}>
              <MyLink
                href={`vehicles`}
                underline="none" onClick={(event) => handleClick(event, location_id)}
              >
                {
                  open.open ? (
                    <>
                      {location.location === location_id ? (
                        <>
                          <div className="highlight"></div>
                          {location_name ? location_name.toUpperCase() : ""}
                        </>
                      ) : (
                        <>
                          <div className="nohighlight"></div>
                          {location_name ? location_name.toUpperCase() : ""}
                        </>
                      )}
                    </>
                  ) : null
                }
              </MyLink>
            </MyListItemButton>
          </MyListItem>
        ))}
        {
          open.open ? (
            <MyListItem disablePadding sx={{ display: 'block' }}>
              <MyListItemButton sx={{ minHeight: 14, justifyContent: open.open ? 'initial' : 'center', px: 2.5 }}>
                <MyLink href={`locations`} underline="none">
                  {Transformtext(t('leftbar.locationsettings'))}
                </MyLink>
              </MyListItemButton>
              <MyListItemButton sx={{ minHeight: 14, justifyContent: open.open ? 'initial' : 'center', px: 2.5 }}>
                <MyLink href={`branches`} underline="none">
                  <LanguageToggle stateChanger={setLang} />
                </MyLink>
              </MyListItemButton>
            </MyListItem>
          ) : null
        }
      </MyList>
    </CustomDrawer >
  );
};
export default LeftBar;
