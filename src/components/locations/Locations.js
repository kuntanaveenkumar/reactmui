import React, { lazy, useState, useMemo, Suspense, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query'
import { useTranslation } from 'react-i18next';
import propTypes from '../propTypes/PropTypes';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { DEFAULTLIMIT } from "../../constants/appConstants"
import { usePostBusinessAddressMutation, useGetAddressByBusinessQuery, useDelLocationMutation, useGetLocationByBusinessQuery } from "../services/business"
const FieldsContainer = lazy(() => import('../common/FieldsContainer'));
import MyBox from "../common/Box"
import MySkeleton from '../common/Skeleton';
import MyTypography from "../common/Typography"
import MyButton from "../common/Button"
import Transformtext from "../common/Transformtext"
import MyTable from "../common/Table"
import { DrawerHeader } from "../common/DrawerHeader"
import useEntityState from "../hooks/useEntityState"
import useGenericData from "../hooks/useGenericData"
import _, { object } from "underscore";
import "../../css/Div.less"
import MyDivider from '../common/Divider';
import AddLocation from "./AddLocation"
//import { setLocationId } from './slices/LocationSlice';
const Locations = ({ listLocations }) => {
    const { t } = useTranslation('common');
    const fields = {
        address: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        country: Yup.string().required(),
        zip: Yup.string().required(),
        created_at: Yup.string().required(),
        updated_at: Yup.string().required(),
        is_active: Yup.string().required()
    };
    const validationSchema = Yup.object().shape(fields);
    const [locationState, setLocationState] = useEntityState("locations", DEFAULTLIMIT, "location_id", "DESC", "");
    const { locations } = locationState;
    const [state, setState] = useState({
        locations: locations,
        isAddLocationLoaded: true,
        isEditLocationLoaded: true,
        locationId: "",
        displaylist: ["edit", "del"],
        isInviteUserForm: true,
        searchTerm: "",
        filteredDevices: "",
        refresh: "0"
    });
    const [delLocation] = useDelLocationMutation({});
    const handleDelete = useCallback(async (id) => {
        const data = await delLocation({ "id": id }).unwrap();
    }, [delLocation])
    const handleSort = useCallback((event, type, orderBy, order, perPage) => {
        setState({
            ...state,
            [type === "location" ? "locations" : ""]: {
                ...state[type === "location" ? "locations" : ""],
                perPage: perPage,
                orderBy: orderBy,
                order: order
            }
        });
    }, []);
    const showLocation = useCallback(() => {
        setState({ ...state, isAddLocationLoaded: true, locations: { ...state.locations, refresh: "1" } });
        refetchLocationes()
    }, [setState]);
    const handleAddLocation = useCallback(() => {
        setState({ ...state, isAddLocationLoaded: false })
    }, [setState]);
    const { business, location } = useSelector(state => ({
        business: state.business,
        location: state.location
    }), _.isEqual);
    const handleEvent = useCallback((event, type, newValue = null) => {
        let updatedState;
        switch (type) {
            case 'page':
                updatedState = newValue === "location"
                    ? {
                        ...state,
                        locations: {
                            ...state.locations,
                            page: event,
                            offset: event * state.locations.perPage
                        }
                    }
                    : "";
                break;
            case 'sort':
                updatedState = newValue === "location"
                    ? {
                        ...state,
                        Locationes: {
                            ...state.locations,
                            orderBy: event
                        }
                    }
                    : "";
                break;
            case 'edit':
                updatedState = {
                    ...state,
                    isAddLocationLoaded: false,
                    LocationId: event.currentTarget.getAttribute('data-id')
                };
                break;
            case 'delete':
                handleDelete(event.target.value)
                break;
            default:
                console.error("Unknown action type: ", type);
                return;
        }
        setState(updatedState);
    }, [setState, state]);
    const { data: locationsData, totalCount: locationsCount, refetch: refetchLocationes } = useGenericData(
        useGetLocationByBusinessQuery,
        business.business,
        "",
        state.locations
    );
    const { data: addresslistData } = useGetAddressByBusinessQuery({ "Businessid": business.business });
    let addressdata = addresslistData ? addresslistData.data : [];
    const addressdatacount = addresslistData?.total_count || 0;
    const initialValues = Object.fromEntries(
        Object.keys(fields).map(key => [key, addressdata[key]])
    );
    const locationsDatalist = locationsData && locationsData.map(Location => {
        return {
            ...location,
            id: location.locations_id
        };
    });
    const handleRowsPerPage = useCallback((limit, type) => {
        let rowsState = type === "Location"
            ? {
                ...state,
                locations: {
                    ...state.locations,
                    perPage: limit
                }
            }
            : "";

        setState(rowsState);
    }, []);
    const Headers = useMemo(() => [
        { field: 'location_name', headerName: Transformtext(t('locations.name')) },
        { field: 'action', headerName: Transformtext(t('general.action')) }
    ], []);
    const [postBusinessAddress] = usePostBusinessAddressMutation({});
    const handleSubmit = useCallback(async (formValue) => {
        formValue.businessId = business.business
        formValue.locationId = location.location
        postBusinessAddress(formValue).unwrap();
        //setState({ ...state, isAddLocationLoaded: true })
    }, [postBusinessAddress])
    useEffect(() => {
    }, [locationsData, state]);
    const handleSearch = (values) => {
        setState({ ...state, searchTerm: values.search })
    };


    

    return (
        state.isAddLocationLoaded ?
            <>
                <MyBox component="main" sx={{ flexGrow: 1, p: 3 }} height={500}>
                    <DrawerHeader />
                    <div className='divHeight50'></div>
                    <MyTypography value={Transformtext(t('locations.locations'))} size="h6" />
                    <div className='divHeightAuto'>
                        <Suspense fallback={<MySkeleton className="Skeleton100PerBy200" />}>
                            <MyTable columns={Headers} rows={locationsDataDatalist} handleView={(event) => handleEvent(event, 'view', "location")} handleDelete={(event) => handleEvent(event, 'delete', "")} handleSort={handleSort} listtype="location" count={locationsCount} page={state.locations.page} rowsPerPage={state.locations.perPage} handlePage={(event) => handleEvent(event, 'page', "location")} handleRowsPerPage={handleRowsPerPage} handleEdit={(event) => handleEvent(event, 'edit', "")} type="location" displaylist={state.displaylist} Order={state.locations.order} />
                        </Suspense>
                    </div>
                    <MyDivider />
                    <div className='divHeight50'></div>
                    <div className='divHeight100'>
                        <MyButton type="button" size="medium" variant="contained" label='locations.addlocation' onClick={handleAddLocation}></MyButton>
                    </div>


                </MyBox>
            </> : <AddLocation showLocation={showLocation} LocationId={state.locationId} />)
}
Locations.propTypes = {
    listLocations: propTypes.locationPropTypes
};
export default Locations;