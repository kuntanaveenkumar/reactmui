import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import toCamelCase from "./camelCase"
export default function Error({msg}) {
    return (
        msg ?
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">{(msg)}</Alert>
            </Stack> : ""
    );
}