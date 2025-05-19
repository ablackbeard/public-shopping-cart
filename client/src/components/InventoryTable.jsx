import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
    {
        field: 'id',
        headerName: 'UPC',
        description: 'UPC for item.',
        sortable: true,
        width: 160,
    },
    {
        field: 'itemName',
        headerName: 'Item Name',
        description: 'Name of the item, i.e. what\'s on the can/packaging.',
        sortable: true,
        width: 160,
    },
    {
        field: 'stock',
        headerName: 'Stock',
        description: 'Quantity of item.',
        sortable: true,
        width: 160,
    },
	{
        field: 'expirationDate',
        headerName: 'Expiration date',
        description: 'Expiration date of item, if perishable.',
        sortable: true,
        width: 160,
    }
];


const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ cb, rows, rowClickCB }) {
    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                onRowSelectionModelChange={(e) => cb(e)}
                columns={columns}
                onRowClick={(e) => rowClickCB(e)}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}