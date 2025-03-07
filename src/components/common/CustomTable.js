import React from 'react';
import { Table as MuiTable, TableBody as MuiTableBody, TableRow as MuiTableRow, TableCell as MuiTableCell } from '@mui/material';

const CustomTable = ({ children, ...props }) => {
    return (
        <MuiTable{...props}  style={{ tableLayout: 'fixed' }}>
            {children}
        </MuiTable>
    );
};

const CustomTableBody = ({ children }) => {
    return (
        <MuiTableBody>
            {children}
        </MuiTableBody>
    );
};

const CustomTableRow = ({ children }) => {
    return (
        <MuiTableRow>
            {children}
        </MuiTableRow>
    );
};

const CustomTableCell = ({ align, children }) => {
    return (
        <MuiTableCell align={align}>
            {children}
        </MuiTableCell>
    );
};

export { CustomTable, CustomTableBody, CustomTableRow, CustomTableCell };
