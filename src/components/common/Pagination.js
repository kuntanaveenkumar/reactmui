import React from 'react';
import { TablePagination, TableRow, TableCell } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import usePagination from '../hooks/usePagination';
const Pagination = ({ totalCount, page, type, rowsPerPage, handlePage, handleRowsPerPage }) => {
    const { handleChangePage, handleChangeRowsPerPage } = usePagination();
    return (
        <TableRow>
            <TableCell>
                <TablePagination
                    width="100%"
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={5}
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                    onPageChange={(_, page) => { handleChangePage(page, rowsPerPage, handlePage, type) }}
                    onRowsPerPageChange={(e) => { handleChangeRowsPerPage(Number(e.target.value), handleRowsPerPage, type) }}
                    ActionsComponent={TablePaginationActions}
                />
            </TableCell>
        </TableRow>
    );
};
export default Pagination;
