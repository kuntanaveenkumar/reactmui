import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage, setRowsPerPage } from '../slices/paginationSlice';
import { useCallback } from 'react';
export default function usePagination() {
    const dispatch = useDispatch();
    const handleChangePage = useCallback((page,rowsPerPage, handlePage,type) => {
        dispatch(setPage(page));
        
        handlePage(page,type,rowsPerPage)        
    }, [dispatch]);

    const handleChangeRowsPerPage = useCallback((rowsPerPage, handleRowsPerPage,type) => {
        dispatch(setRowsPerPage(rowsPerPage));
        handleRowsPerPage(rowsPerPage,type)
    }, [dispatch]);

    return { handleChangePage, handleChangeRowsPerPage };
}
