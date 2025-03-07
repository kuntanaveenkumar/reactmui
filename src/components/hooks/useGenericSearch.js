import { useState, useEffect } from 'react';
const useGenericSearch = (queryFn, businessId, locationId, state) => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { data: queryData, refetch } = queryFn({
        "businessid": businessId,
        "locationid": locationId,
        "q": state.q,
        "type": state.type
    });
    useEffect(() => {
        if (queryData) {
            setData(queryData.data || []);
            setTotalCount(queryData.total_count || 0);
        }
    }, [queryData]);
    return { data, totalCount, refetch };
};
export default useGenericSearch;




