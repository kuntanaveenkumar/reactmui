import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
//import TablePaginationActions from './TablePaginationActions';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircle } from '@mui/icons-material';
import DeviceConfirmBox from "./DevicePopup"
import ConfirmBox from "./Popup"
import Pagination from "./Pagination"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#902122",
        color: "#fff",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const TableRowComponent = ({ rows, columns, handleDelete, handleView, handleSort, handleEdit, type, displaylist, handleAdd }) => (
    <TableBody>
        {rows && rows.map((row, rowIndex) => (
            <StyledTableRow
                key={rowIndex}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                {
                    columns.map((column, colIndex, columns) => {
                        
                        if (columns.length === colIndex + 1) {
                            return (
                                <StyledTableCell key={colIndex} align="left">
                                    {displaylist.includes("view") && (
                                        <>

                                            <VisibilityIcon key={rowIndex} value={row["id"]} data-id={row["id"]} type={type} onClick={(event) => handleView(event, type, row["id"])}  data-ccm-id={row["ccm_id"]}/>
                                            &nbsp;&nbsp;
                                        </>
                                    )}
                                    {displaylist.includes("edit") && (
                                        <>
                                            <EditIcon key={rowIndex} value={row["id"]} data-id={row["id"]} type={type} onClick={(event) => handleEdit(event, type, row["id"])} />
                                            &nbsp;&nbsp;
                                        </>
                                    )}
                                    {displaylist.includes("add") && (
                                        <>
                                            <AddCircle key={rowIndex} value={row["id"]} data-id={row["id"]} type={type} onClick={(event) => handleAdd(event, type, row["id"])} />&nbsp;&nbsp;
                                        </>
                                    )}
                                    {displaylist.includes("del") && (
                                        type === "device" ? (
                                            <DeviceConfirmBox
                                                key={rowIndex}
                                                data-id={row["id"]}
                                                value={row["id"]}
                                                type={type}
                                                onConfirm={(event) => handleDelete(event, type, row["id"])}
                                            />
                                        ) : (
                                            <ConfirmBox
                                                key={rowIndex}
                                                data-id={row["id"]}
                                                value={row["id"]}
                                                type={type}
                                                onConfirm={(event) => handleDelete(event, type, row["id"])}
                                            />
                                        )
                                    )}

                                </StyledTableCell>
                            );
                       
                        } else {
                            return (
                                <StyledTableCell key={colIndex} align="left">
                                    {type === "device" && column.field === "vehicles_id" ? (
                                        <>
                                            <VisibilityIcon
                                                data-id={row["vehicles_id"]}                                               
                                                key={rowIndex}
                                                value={row["vehicles_id"]}
                                                type={type}
                                                onClick={(event) => handleView(event, type, row["vehicles_id"])}
                                            />
                                            
                                        </>
                                    ) : (
                                        row[column.field]
                                    )}



                                </StyledTableCell>
                            );
                        }
                    })
                }
            </StyledTableRow >
        ))}
    </TableBody >
);
const StyledArrowUpward = () => <ArrowUpward style={{ color: '#fff', fontSize: "15px" }} />;
const StyledArrowDownward = () => <ArrowDownward style={{ color: '#fff', fontSize: "15px" }} />;
const MyTable = ({ rows, columns, handleDelete, handleView, handleSort, handleEdit, type, count, page, rowsPerPage, handlePage, handleRowsPerPage, displaylist, Order, handleAdd }) => (
    <TableContainer component={Paper}>
        <Table sx={{
            minWidth: 650,
            border: '1px solid',
            borderImage: 'linear-gradient(to right, red, blue)',
            boxShadow: 1
        }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    {columns.map((column, index) => (
                        column.headerName?
                        (<StyledTableCell key={index} align="left" value={column.headerName}>
                            <TableSortLabel
                                key={column.field}
                                onClick={(event) => handleSort(event, type, column.field, Order === "ASC" ? "DESC" : "ASC", rowsPerPage)}
                                active={true}
                                value={column.headerName}
                                Order={Order}
                                style={{ color: '#fff' }}
                                IconComponent={Order === 'DESC' ? StyledArrowUpward : StyledArrowDownward}
                            >
                                {column.headerName}
                            </TableSortLabel></StyledTableCell>):""
                    ))}
                </TableRow>
            </TableHead>
            <TableRowComponent rows={rows} columns={columns} handleDelete={handleDelete} handleView={handleView} handleEdit={handleEdit} handleAdd={handleAdd} type={type} displaylist={displaylist} />
        </Table>
        <Pagination totalCount={count} page={page} rowsPerPage={rowsPerPage} handlePage={handlePage} handleRowsPerPage={handleRowsPerPage} type={type} />
    </TableContainer>
);

export default MyTable;
