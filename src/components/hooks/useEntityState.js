import { useState } from 'react';
const useEntityState = (entity, perPage, orderBy = "id", order = "DESC", keyword = "", Id = null) => {
    const [state, setState] = useState({
        [entity]: {
            orderBy: orderBy ? orderBy : "id",
            order: order ? order : "DESC",
            page: 0,
            offset: 0,
            perPage: (perPage !== "-1" && perPage !== "") ? perPage : 5,
            keyword: keyword ? keyword : "",
            Id: Id ? Id : ""
        }
    });
    return [state, setState];
};
export default useEntityState;



