import { useState, useEffect } from 'react';
const useGenericData = (queryFn, businessid, locationId, state) => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { data: queryData, refetch } = queryFn({
        "businessid": businessid,
        "locationid": locationId,
        "limit": state.perPage,
        "offset": state.offset,
        "orderBy": state.orderBy,
        "order": state.order,
        "keyword": state.keyword,
        "Id": state.Id
    });
    useEffect(() => {
        if (queryData) {
            setData(queryData.data || []);
            setTotalCount(queryData.total_count || 0);
        }
    }, [queryData]);
    return { data, totalCount, refetch };
};
export default useGenericData;




