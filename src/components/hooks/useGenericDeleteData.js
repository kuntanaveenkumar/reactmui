import { useState, useEffect, useCallback } from 'react';
const useGenericDeleteData = (queryFn,businessId, locationId, id)  => {
    const [mutation, { isLoading, isSuccess, isError, error, data }] = queryFn({});
    const Delete = useCallback(async (businessId, locationId, id) => {
        const data = await mutation({
            "businessid": businessId,
            "locationid": locationId,
            "id": id
        }).unwrap();
        return data;
    }, [mutation]);
    return { Delete, isLoading, isSuccess, isError, error, data };
};
export default useGenericDeleteData;