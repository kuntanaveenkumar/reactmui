import React from 'react';
import { DataGrid as GTable } from '@mui/x-data-grid';
import '../../css/Datagrid.less';


const DataGrid = ({ headers, tableData }) => (
  <GTable
    rows={tableData}
    columns={headers}
    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
    headerClassName="datagrid-header"
  />
);
export default DataGrid;