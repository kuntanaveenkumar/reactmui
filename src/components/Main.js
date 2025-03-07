import React, { Suspense, useState, useCallback, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import propTypes from './propTypes/PropTypes';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { useGetBusinessQuery, useGetSearchQuery } from './services/business'
import { CustomTable, CustomTableBody, CustomTableRow, CustomTableCell } from './common/CustomTable';
import { MyList, MyListItem, MyListItemIcon, MyListItemText, MyListItemButton } from '../components/common/List';
import { useTranslation } from 'react-i18next';
import toCamelCase from './common/camelCase';
const MyTabs = lazy(() => import('./common/Tabs'));
import MyTypography from "./common/Typography"
const MyBox = lazy(() => import('./common/Box'));
const CustomTabPanel = lazy(() => import('./common/CustomTabPanel'));
const Logo = lazy(() => import('./Logo'));
const { DrawerHeader } = lazy(() => import('./common/DrawerHeader'));
import { setBusinessId } from './slices/businessSlice';
import "../css/Box.less"
import { Logout, WindowOutlined } from '@mui/icons-material';
import { setBranchId } from './slices/locationSlice';
import useEntityState from "../components/hooks/useEntityState"
import useGenericData from "../components/hooks/useGenericData"
import { useGetBranchByBusinessQuery, usePostBusinessMutation } from './services/business';
import CreateBusiness from './CreateBusiness';
const MyButton = lazy(() => import('./common/Button'));
import { useGenericPostData } from "./hooks/useGenericPostData"
import MySkeleton from "./common/Skeleton"
const Main = (business) => {
    const { t } = useTranslation('common');
    const [tab, setTab] = useState(0);
    const [orgId, setOrgId] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [locationState, setVehicleState] = useEntityState("locations", "1", "location_id", "ASC", "");
    const { locations } = locationState;

    const [state, setState] = useState({
        locations: locations,
        Id: "",
        search: { "type": "user", "q": localStorage.getItem("email") }
    })

    const { data: SearchData, totalCount: SearchCount, refetch: refetchSearch } = useGenericData(useGetSearchQuery, business.business, "", state.search);

    const [userId, setUserId] = useState(SearchData["0"] ? SearchData["0"]["users_id"] : "")
    const handleChange = async (event, newTab) => {


        const selectedTab = event.target.closest('[role="tab"]');
        const businessId = selectedTab ? selectedTab.getAttribute('data-businessId') : null;

        setTab(selectedTab.getAttribute('id'));
        setOrgId(businessId)
        await dispatch(setBusinessId({ 'id': businessId }))
    };

    const { data: locationsData, totalCount: locationsCount, refetch: refetchLocations} = useGenericData(
        useGetLocationByBusinessQuery,
        orgId,
        "",
        state.locations
    );
    const handleReset = () => {
        window.location.reload();
    }
    useEffect(() => {
        refetchLocations()
    }, [orgId,locationsData]);

    if (orgId != "") {
        locationsData && locationsData.length > 0 && locationsData.map((item, index) => {
            if (index == 0) {
                dispatch(setLocationId({ 'id': item.location_id }));
                window.location.href = "./locations"
            }
        });
        if (locationsData && locationsData.length == 0) {
            window.location.href = "./locations"
        }
    }
    const a11yProps = (index, businessId) => {
        return {
            id: `simple-tab${index}`,
            'data-businessid': businessId,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const Logout = () => {
        window.location.href = "./index"
    }
    const locationslist = useGetBusinesssQuery({ "users_id": userId }).data?.data || [];
    let tabData = locationslist.map(item => ({ label: (item.name) ? toCamelCase(item.name) : "", id: item.id }));

    return (<Suspense fallback={<div>...</div>}>
        <MyBox component="div" sx={{ height: '100vh', flexDirection: 'column' }}>
            <Suspense fallback={<div>...</div>}>
                <MyBox className="Main_Box">
                    <CustomTable>
                        <CustomTableBody>
                            <CustomTableRow>
                                <CustomTableCell align="center">
                                    <Suspense fallback={<div>...</div>}>
                                        <Logo />
                                    </Suspense>
                                </CustomTableCell>
                            </CustomTableRow>
                            <CustomTableRow>
                                <CustomTableCell align="center">
                                    <MyTypography value={t('leftbar.welcome').toUpperCase()} size="h6" />
                                    <MyList>
                                        <MyListItem disablePadding sx={{ display: 'block' }}>
                                            <MyListItemButton sx={{ minHeight: 48, justifyContent: open.open ? 'initial' : 'center', px: 2.5 }} onClick={Logout}>
                                                <MyTypography value={t('leftbar.logout').toUpperCase()} size="h6" />
                                            </MyListItemButton>
                                        </MyListItem>
                                    </MyList>
                                </CustomTableCell>
                            </CustomTableRow>
                            <CustomTableRow>
                                <CustomTableCell align="right">
                                    <MyBox component="div" sx={{ height: '5vh', flexDirection: 'column' }}>
                                        <CreateBusiness open={open} handleClose={handleClose} handleReset={handleReset} />
                                    </MyBox>
                                </CustomTableCell>
                            </CustomTableRow>
                            <CustomTableRow>
                                <CustomTableCell>
                                    <>
                                        <MyBox sx={{ borderTop: 1, borderColor: 'divider',  width: '100%' }}>
                                            <Suspense fallback={<div>...</div>}>
                                                     <MyTabs value={tab} onChange={handleChange} onClick={handleChange} labels={tabData} a11yProps={a11yProps} />
                                              
                                            </Suspense>
                                        </MyBox>
                                        {businessslist && businessList.flatMap((business, j) => (
                                            <Suspense fallback={<div>...</div>}>
                                                <CustomTabPanel value={tab} index={j} key={j}>
                                                    {toCamelCase(`${business.name}`)}
                                                </CustomTabPanel>
                                            </Suspense>
                                        ))}
                                    </>
                                </CustomTableCell>
                            </CustomTableRow>
                        </CustomTableBody>
                    </CustomTable>
                </MyBox>
            </Suspense>
            <Suspense fallback={<MySkeleton className="Skeleton200By20" />}>
                <MyButton type="button" size="medium" variant="contained" label='main.createobusiness' onClick={handleOpen}></MyButton>
            </Suspense>
        </MyBox >

    </Suspense>


    );
};
Main.propTypes = {
    business: propTypes.businessPropTypes
};
export default Main;
