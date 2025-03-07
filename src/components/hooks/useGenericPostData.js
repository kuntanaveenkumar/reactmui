import { useCallback } from 'react';
export const useGenericPostData = (queryFn,businessId, locationId,formValue) => {
    
    const [mutation, { isLoading, isSuccess, isError, error, data }] = queryFn({});
    const Submit = useCallback(async (businessId, locationId, formValue) => {
        formValue.businessId = businessId;
        formValue.locationId = locationId;
       
        const data = await mutation(formValue).unwrap();
        return data;
    }, [mutation]);
    return { Submit, isLoading, isSuccess, isError, error, data };
};