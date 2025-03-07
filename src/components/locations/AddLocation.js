import React, { lazy, Suspense, useCallback, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';
import { DrawerHeader } from '../common/DrawerHeader';
import MySkeleton from '../common/Skeleton';
const MyBox = lazy(() => import('../common/Box'));
const MyButton = lazy(() => import('../common/Button'));
const MyTypography = lazy(() => import('../common/Typography'));
import useEntityState from "../hooks/useEntityState"
import useGenericData from "../hooks/useGenericData"
import FieldsContainer from '../common/FieldsContainer';
import { DEFAULTLIMIT } from "../../constants/appConstants"
import { usePostLocationByBusinessMutation, useGetLocationByLocationIdAndLocationBusinessQuery, useGetMakesQuery, useGetAddressByBusinessQuery } from "../services/Business"
import { useGenericPostData } from "../hooks/useGenericPostData"
import { useSelector, useDispatch } from 'react-redux';
import _, { object } from "underscore";
import Error from "../common/Error";
const AddLocation = ({ showLocation, locationId }) => {
 
    const { t } = useTranslation('common');
    const { business, location } = useSelector(state => ({
        business: state.business,
        location: state.location
    }), _.isEqual);
    const [locationState, setLocationState] = useEntityState("locations", -1, "", "", locationId);
    
    const { locations } = locationState;

    const [addressState, setAddressState] = useEntityState("address", -1, "", "", "");
    const { address } = addressState;
       
    const [state, setState] = useState({
        locations: locations,
        address: address,
        locationId:locationId?locationId:"",
        message: ""
    });
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        address: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        country: Yup.string(),
        zip: Yup.string()
    });
    const { Submit, isLoading, isSuccess, isError, error, data } = useGenericPostData(usePostLocationByBusinessMutation,
        Business.Business,
        location.location,
        state.vehicles);
    const { data: locationsData, totalCount: locationsCount, refetch: refetchLocationes } = useGenericData(
        useGetLocationByLocationIdAndLocationBusinessQuery,
        business.business,
        locationId,
        state.locations
    );
   
    const { data: addressData, totalCount: addressCount, refetch: refetchAddress } = useGenericData(
        useGetAddressByBusinessQuery,
        business.business,
        locationId,
        state.address
    );
    
    const handleSubmit = async (formValue) => {
        try {
            console.log(formValue)
            await Submit(business.business, location.location, formValue)
            setState({ ...state, message: "" });
        } catch (err) {
            setState({ ...state, message: "Add Failed" });
        }
    };
    useEffect(() => {
       
        if (isError) {
            setState({ ...state, message: error.error.message + " " +  error.error.failures })
        } else if (isSuccess) {
            showLocation()
            refetchLocationes()
        }
    }, [isSuccess, isError, error, data, state]);
    let fulladdress=""
    locationsData && locationsData.map(item => {
        fulladdress = addressData.find(address => address.id === item.addresses_id);
       
    });
    const initialValues = {
        name: locationsData[0] ? locationsData[0].locations_name : "",
        address: fulladdress ? fulladdress.address : "",
        city: locationsData[0] ? locationsData[0].city : "",
        state: locationsData[0] ? locationsData[0].state : "",
        country: locationsData[0] ? locationsData[0].country : "",
        zip: locationsData[0] ? locationsData[0].zip : "",
        locationId:locationId?locationId:""
    };
    return (
        <MyBox component="main" sx={{ flexGrow: 1, p: 3 }} height={500}>
            <DrawerHeader />
            <div className='divHeight50'></div>
            <Error msg={state.message} />
            <div style={{ height: 200, width: '100%' }}>
                <MyTypography value={t('locations.addlocation').toUpperCase()} size="h6" />
                <Suspense fallback={<MySkeleton className="Skeleton100PerBy200" />}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ values, errors, handleChange, handleSubmit }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Suspense fallback={<MySkeleton className="Skeleton100PerBy200" />}>
                                    <FieldsContainer
                                        fields={[
                                            {
                                                controlId: 'name',
                                                label: 'locations.name',
                                                type: 'text',
                                                name: 'name',
                                                value: values.name,
                                                onChange: handleChange,
                                                error: errors.name
                                            },
                                            {
                                                controlId: 'address',
                                                label: 'locations.address',
                                                type: 'text',
                                                name: 'address',
                                                value: values.address,
                                                onChange: handleChange,
                                                error: errors.address
                                            },
                                            {
                                                controlId: 'state',
                                                label: 'locations.state',
                                                type: 'text',
                                                name: 'state',
                                                value: values.state,
                                                onChange: handleChange,
                                                error: errors.state
                                            },
                                            {
                                                controlId: 'city',
                                                label: 'locations.city',
                                                type: 'text',
                                                name: 'city',
                                                value: values.city,
                                                onChange: handleChange,
                                                error: errors.city
                                            },
                                            {
                                                controlId: 'country',
                                                label: 'locations.country',
                                                type: 'text',
                                                name: 'country',
                                                value: values.country,
                                                onChange: handleChange,
                                                error: errors.country
                                            },
                                            {
                                                controlId: 'zip',
                                                label: 'locations.zip',
                                                type: 'text',
                                                name: 'zip',
                                                value: values.zip,
                                                onChange: handleChange,
                                                error: errors.zip
                                            },
                                            {
                                                controlId: 'locationId',
                                                label: 'locations.locationId',
                                                type: 'hidden',
                                                name: 'locationId',
                                                value: values.locationId,
                                                onChange: handleChange,
                                                error: errors.locationId
                                            }
                                        ]}
                                    />
                                </Suspense>
                                <Error msg={state.message} />
                                <MyButton type="submit" size="medium" variant="contained" label='general.submit'></MyButton>
                            </Form>
                        )}
                    </Formik>
                </Suspense>
            </div>
        </MyBox>
    );
};
export default AddLocation;
