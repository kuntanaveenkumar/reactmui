import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from "../../constants/appConstants"
import propTypes from '../propTypes/PropTypes';
import { include } from 'underscore';
const generateGetUrl = (entity, businessid, locationid, limit, offset, orderBy, order, keyword, Id, providesTags) => {


    let url = entity === 'makes' || entity === 'permissions' || entity === 'models' || entity === 'plans' ||  entity === 'search' || entity === 'address' || entity === 'addresses' || entity === 'colors' ? `` : '/Businesss';
    if (entity === "vehicle-groups" && providesTags === "vehicles" && Id != "") {
        entity = `vehicle-groups/${Id}/vehicles`;
    }
    if (businessid) {
        if (entity !== 'addresses' && entity !== 'makes' && entity !== 'permissions' && entity !== 'clients' && entity !== 'client-groups' && entity !== 'plans' && entity !== 'search' && entity !== 'models' && entity !== 'address' && entity !== 'colors' && entity !== 'Locationes' && entity !== 'Locationeswithid') { url += `/${businessid}${locationid ? `/Locationes/${locationid}` : ''}`; }
        if (entity == 'Locationes') { url += `/${businessid}`; }
        if (entity == 'clients' || entity == 'client-groups') { url += `/${businessid}`; }
        if (entity == 'Locationeswithid') {
            entity = `Locationes/${locationid}`
            url += `/${businessid}`;
        }
    }
    if (entity == "synthesis" || entity == "trips") {
        url += `/vehicle-groups/${keyword}/vehicles/${Id}`;
        url += `/${entity}?`;
    }
    else {
        url += entity !== 'Businesss' && entity !== 'Business-staffs' ? `/${entity}?` : '?';
    }

    const queryParams = [];
    if (limit && limit != "-1") queryParams.push(`limit=${limit}`);
    const entityPrefixes = { 'vehicle-groups': 'vehicle_groups', 'devices': 'devices' };
    if (entity in entityPrefixes) { orderBy = `${entityPrefixes[entity]}.${orderBy}`; }

    if (orderBy && order && limit != "-1") { queryParams.push(`orderBy=${orderBy} ${order}`); }
    if (offset) queryParams.push(`offset=${offset}`);
    console.log("Id" + Id)




    if (entity == "search") {

        queryParams.push(`q=${keyword}&type=${order}`);
    }
    if (entity == "vehicles-infos") {
        if (keyword) {
            const searchFields = ['ccm_id'];
            queryParams.push(...searchFields.map(field => `devices.${field}=${keyword}`));
        }
        Id ? queryParams.push(`vehicles_id=${Id}`) : ""
    }

    if (entity == "vehicles")
        if (keyword) {

            if (["unresponsive", "parked", "inmovement"].some(substring => keyword.includes(substring))) {
                queryParams.push(`status=${String(keyword).toUpperCase()}`);
            }
            else {
                const searchFields = ['name', 'vin', 'plate'];
                queryParams.push(...searchFields.map(field => `${entity}.${field}=${keyword}`));
            }
        }
    if (entity == "synthesis") {
        const params = [];
        if (orderBy && order) {
            if (orderBy != "id")
                params.push(`?between='${String(orderBy)}' AND '${String(order)}'`);
        }
        url += params.join('?');
    }
    else {
        url += queryParams.join('&');
    }
    return url;
};
const generatePostUrl = (entity, businessid, locationid, rest) => {

    if (entity == "vehicle-groups") { entity = "transfer/vehicle-groups" }
    if (entity == "vehicle_groups") { entity = "vehicle-groups" }
    if (entity == "lock") { entity = "/vehicle-groups/" + rest.vehicleGroupId + "/vehicles/" + rest.vehicleId + "/commands/lock" }
    if (entity == "unlock") { entity = "/vehicle-groups/" + rest.vehicleGroupId + "/vehicles/" + rest.vehicleId + "/commands/unlock" }
    if (entity == "users" && rest.type == "staff_groups") { entity = "staff-groups/" + rest.staffgroup + "/users" }
    if (entity == "users" && rest.type == "client_groups") { entity = "client-groups/" + rest.clientgroup + "/users" }
    let url = entity === 'addresses' ? `` : '/Businesss';
    if (businessid) {
        url += `/${businessid}`;
        if (entity !== 'Locationes' && entity !== 'client-groups')
            url += `${locationid ? `/Locationes/${locationid}` : ''}`

    }
    url += entity !== 'Businesss' ? `/${entity}` : '';
    //Special case for PATCH Locationes
    if (entity == 'Locationes' && rest.locationid)
        url += `${rest.locationid ? `/${rest.locationid}` : ''}`
    return url;
};
const generateDelUrl = (entity, businessid, locationid, id) => {
    const url = `Businesss/${businessid}/Locationes/${locationid}/${entity}/${id}`;
    return url;
};
const commonQuery = (builder, entity, providesTags) => {
    return builder.query({
        ...propTypes[entity + 'PropTypes'],
        query: (data) => {

            let url = ""

            const { businessid, locationid, limit, offset, orderBy, order, keyword, Id, state } = data;
            if (entity === "search") {

                let type = data.type
                let q = data.q
                url = generateGetUrl(entity, "", "", "", "", "", type, q, Id, providesTags);
            }
            else {
                url = generateGetUrl(entity, businessid, locationid, limit, offset, orderBy, order, keyword, Id, providesTags, state);
            }

            if (entity === "years") {
                const currentYear = new Date().getFullYear();
                const years = [];
                for (let year = 1983; year <= currentYear; year++) {
                    years.push(year);
                }
                return JSON.stringify({
                    body: {
                        message: "hello world",
                        data: [
                            {
                                year: years
                            }
                        ]
                    }
                });
            }
            if (entity === "colors") {
                return { url, method: 'GET', forceRefetch: true };
            }
            return { url, method: 'GET', forceRefetch: true };
        },
        providesTags: [providesTags + 'list'],
        invalidatesTags: [providesTags + 'list'],
    });
};
const commonMutation = (builder, entity, propTypes, methodType = 'POST') => {

    return builder.mutation({
        query: ({ businessid, locationid, ...rest }) => ({
            url: generatePostUrl(entity, businessid, locationid, rest),
            method: (entity == "Locationes" && rest.locationid != "") ? "PATCH" : methodType,
            body: entity != "vehicle-groups" ? {
                [entity == "staff-groups" ? "staff_groups" : (entity == "vehicle-groups" ? "" : (entity == "client-groups" ? "client_groups" : entity))]: {
                    ...(entity === 'Locationes' && rest.locationid == "" && {
                        "name": rest.name,
                        "addresses":
                        {
                            "address": rest.address,
                            "state": rest.state,
                            "city": rest.city,
                            "country": rest.country,
                            "zip": rest.zip
                        }
                    }),
                    ...(entity === 'Locationes' && rest.locationid != "" && {
                        "name": rest.name,
                        "addresses":
                        {
                            "address": rest.address,
                            "state": rest.state,
                            "city": rest.city,
                            "country": rest.country,
                            "zip": rest.zip
                        }
                    }),
                    ...(entity === 'Locationes' && rest.locationid == "" && { "Businesss.id": Number(businessid) }),
                    ...(entity === 'vehicle_groups' && {
                        "name": rest.name,
                        "Locationes.id": locationid,
                        "description": rest.description,
                        "plans.id": rest.plan,
                        "vehicle_groups.staff_groups": [
                            {
                                "staff_groups.id": Number(rest.usergroup)
                            }
                        ]
                    }),
                    ...(entity === 'vehicle-groups' && {
                        "vehicle_groups.vehicles": {
                            "new_vehicle_groups_id": Array(rest.groupid),
                            "vehicles.id": Number(rest.vehicleid)
                        }
                    }),

                    ...(entity === 'devices' && (() => {
                        const { vehicle, ...restWithoutVehicle } = rest;
                        return {
                            ...restWithoutVehicle,
                            "vehicles.id": rest.vehicle,
                            "Locationes.id": locationid
                        };
                    })()),
                    ...(entity === 'vehicles' && (() => {
                        const { purchasedate, models, makes, colors, vehiclegroup, years, ...restWithoutPurchasedate } = rest;
                        return {
                            ...restWithoutPurchasedate,
                            "is_vehicles": true,
                            "models.id": Number(rest.models),
                            "vehicle_groups.id": rest.vehiclegroup,
                            "purchase_Date": purchasedate,
                            "year": Number(rest.years),
                            "odometer": Number(rest.odometer)
                        };
                    })()),
                    ...(entity === 'staff-groups' && {
                        "name": rest.name,
                        "description": rest.description,
                        "Locationes.id": locationid,
                        "staff_groups.permissions": rest.permissions
                    }),
                    ...(entity === 'client-groups' && {
                        "name": rest.name,
                        "Businesss.id": Number(businessid),
                        "description": rest.description
                    }),
                    ...(entity === 'clients' && {
                        "name": rest.name,
                        "Businesss.id": Number(businessid),
                        "description": rest.description
                    }),
                    ...(entity === 'users' && (() => {
                        const groupId = rest.type === "staff_groups" ? Number(rest.staffgroup) : Number(rest.clientgroup);
                        console.log({
                            [`${rest.type}.users`]: [{
                                [`${rest.type}.id`]: groupId,
                                "users.id": rest.id
                            }]
                        });
                        return {
                            [`${rest.type}.users`]: [{
                                [`${rest.type}.id`]: groupId,
                                "users.id": rest.id
                            }]
                        };
                    })()),
                    ...(entity === 'lock' && (() => {

                        console.log(rest);

                    })()),
                    ...(entity === 'Businesss' && {
                        "name": rest.name,
                        "addresses":
                        {
                            "address": rest.address,
                            "state": rest.state,
                            "city": rest.city,
                            "country": rest.country,
                            "zip": rest.zip
                        }
                    })

                }
            } : {
                "new_vehicle_groups_id": Number(rest.groupid),
                "vehicles_ids": (rest.vehicleid)
            }
        }),
        invalidatesTags: [`${entity}list`],
        transformResponse: async (baseQueryReturnValue, meta, args) => {
            return baseQueryReturnValue;
        },
        transformErrorResponse: async (response, meta, arg) => {
            console.log(response)
            return response.data;
        },
        ...propTypes[entity + 'PropTypes'],
        providesTags: [`${entity}list`]
    });
};
const commonDelMutation = (builder, entity, providesTags) => {
    
    return builder.mutation({
        query: ({ businessid, locationid, ...rest }) => {
            console.log(...rest);
            return {
                url: generateDelUrl(entity, businessid, locationid, rest.id),
                method: 'DELETE',
                body: {
                    id: rest.id
                }
            }
        },
        ...propTypes[entity + 'PropTypes'],
        providesTags: [`post${entity}`]
    });
};
export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['Locationeslist'],
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
        // credentials: "include",

        prepareHeaders: (headers) => {
            headers['Content-Type'] = 'application/json'
          
            headers.set("Session", localStorage.getItem("token") + "");


            //     headers.set("SameSite", "Lax");
            //    headers.set("Access-Control-Allow-Credentials", false);
            //    headers.set("Access-Control-Allow-Origin", "master.d3t9k0qgrodnli.amplifyapp.com/*");
            //      headers.set('Authorization', `Bearer 99a7aef481b62f07e1c85b5015240f9c5bcefa4bd92056c239e0459f4ca69f5803ad5303ee5fb54dbe1fb87ac1a3e452eb0f44c7f2b3e1bd90c629f4bd6467f2`);



            //       headers.set("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTONS");
            //        headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")


            return headers;
        },

    }),
    endpoints: (builder) => ({
        getBusinesss: commonQuery(builder, 'Businesss', 'Businesss'),
        getLocationByBusiness: commonQuery(builder, 'Locationes', 'Locationes'),
        getLocationBylocationidAndLocationBusiness: commonQuery(builder, 'Locationeswithid', 'Locationes'),
        getVehicleByBusinessAndLocation: commonQuery(builder, 'vehicles', 'vehicles'),
        getClientsByBusinessAndLocation: commonQuery(builder, 'clients', 'clients'),
        getClientGroupsByBusinessAndLocation: commonQuery(builder, 'client-groups', 'clientgroups'),
        getPlansByBusinessAndLocation: commonQuery(builder, 'plans', 'plans'),
        getVehicleByVehicleGroupAndBusinessAndLocation: commonQuery(builder, 'vehicle-groups', 'vehicles'),
        getVehicleTripsByVehicleGroupAndBusinessAndLocation: commonQuery(builder, 'trips', 'trips'),
        getDeviceByBusinessAndLocation: commonQuery(builder, 'vehicles-infos', 'devices'),
        getDeviceInfosByBusinessAndLocation: commonQuery(builder, 'vehicles-infos', 'devices'),
        getMakes: commonQuery(builder, 'makes', 'makes'),
        getModels: commonQuery(builder, 'models', 'models'),
        getColors: commonQuery(builder, 'colors', 'colors'),
        getAddress: commonQuery(builder, 'address', 'address'),
        getYears: commonQuery(builder, 'years', 'years'),
        getSynthesisByBusinessAndLocation: commonQuery(builder, 'synthesis', 'synthesis'),
        getVehicleGroupsByBusinessAndLocation: commonQuery(builder, 'vehicle-groups', 'vehiclegroups'),
        getStaffByBusinessAndLocation: commonQuery(builder, 'staffs', 'staffs'),
        getStaffGroupsByBusinessAndLocation: commonQuery(builder, 'staff-groups', 'staffgroups'),
        getPlansByBusiness: commonQuery(builder, 'plans', 'plans'),
        getAddressByBusiness: commonQuery(builder, 'addresses', 'addresses'),
        getAlertsByBusiness: commonQuery(builder, 'alerts', 'alerts'),
        getRentalByBusinessAndLocation: commonQuery(builder, 'rentals', 'rentals'),
        postVehicleGroupByBusinessAndLocation: commonMutation(builder, 'vehicle_groups', propTypes.vehicleGroupsPropTypes, "POST"),
        postClientGroupByBusinessAndLocation: commonMutation(builder, 'client-groups', propTypes.clientGroupsPropTypes, "POST"),
        postLockByBusinessAndLocation: commonMutation(builder, 'lock', propTypes.commandlockPropTypes, "POST"),
        postUnLockByBusinessAndLocation: commonMutation(builder, 'unlock', propTypes.commandunlockPropTypes, "POST"),
        postUpdateStatusByBusinessAndLocation: commonMutation(builder, 'updatestatus', propTypes.commandupdatestatusPropTypes, "POST"),
        postVehicleByBusinessAndLocation: commonMutation(builder, 'vehicles', propTypes.vehiclePropTypes, "POST"),
        postAlertByBusinessAndLocation: commonMutation(builder, 'addalerts', propTypes.addalertsPropTypes, "POST"),
        postDeviceByBusinessAndLocation: commonMutation(builder, 'devices', propTypes.devicePropTypes, "POST"),
        postStaffByBusinessAndLocation: commonMutation(builder, 'users', propTypes.staffPropTypes, "POST"),
        postClientByBusinessAndLocation: commonMutation(builder, 'users', propTypes.clientsPropTypes, "POST"),
        postStaffGroupsByBusinessAndLocation: commonMutation(builder, 'staff-groups', propTypes.staffgroupPropTypes, "POST"),
        postBusiness: commonMutation(builder, 'Businesss', propTypes.BusinessPropTypes, "POST"),
        postBusinessAddress: commonMutation(builder, 'addresses', propTypes.addressPropTypes, "POST"),
        postLocationByBusiness: commonMutation(builder, 'locatio', propTypes.LocationPropTypes, "POST"),
        postVehicleToVehicleGroupByBusinessAndLocation: commonMutation(builder, 'vehicle-groups', propTypes.vehicletovehicleGroupPropTypes, "PATCH"),
        delVehicleGroup: commonDelMutation(builder, 'vehicle-groups', 'vehicle-groups', propTypes.vehicleGroupsPropTypes),
        delVehicle: commonDelMutation(builder, 'vehicle', 'vehicle', propTypes.vehiclePropTypes),
        delLocation: commonDelMutation(builder, 'Location', 'Locationes', propTypes.LocationPropTypes),
    }),
});
export const {
    useGetBusinesssQuery,
    useGetPermissionsQuery,
    useGetSearchQuery,
    useGetLocationByBusinessQuery,
    useGetLocationBylocationidAndLocationBusinessQuery,
    useGetVehicleByBusinessAndLocationQuery,
    useGetVehicleByVehicleGroupAndBusinessAndLocationQuery,
    useGetVehicleTripsByVehicleGroupAndBusinessAndLocationQuery,
    useGetDeviceByBusinessAndLocationQuery,
    useGetDeviceInfosByBusinessAndLocationQuery,

    useGetClientsByBusinessAndLocationQuery,
    useGetClientGroupsByBusinessAndLocationQuery,
    useGetSynthesisByBusinessAndLocationQuery,
    useGetPlansByBusinessAndLocationQuery,
    useGetVehicleGroupsByBusinessAndLocationQuery,
    useGetStaffByBusinessAndLocationQuery,
    useGetPlansByBusinessQuery,
    useGetStaffGroupsByBusinessAndLocationQuery,
    useGetAddressByBusinessQuery,
    useGetAlertsByBusinessQuery,
    usePostLockByBusinessAndLocationMutation,
    usePostUnLockByBusinessAndLocationMutation,
    usePostUpdateStatusByBusinessAndLocationMutation,
    useGetRentalByBusinessAndLocationQuery,
    usePostVehicleGroupByBusinessAndLocationMutation,
    usePostClientGroupByBusinessAndLocationMutation,
    usePostVehicleByBusinessAndLocationMutation,
    usePostAlertByBusinessAndLocationMutation,
    usePostDeviceByBusinessAndLocationMutation,
    usePostStaffByBusinessAndLocationMutation,
    usePostBusinessMutation,
    usePostStaffGroupsByBusinessAndLocationMutation,
    usePostClientByBusinessAndLocationMutation,
    useDelLocationMutation
} = apiSlice;

