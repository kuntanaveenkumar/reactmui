import React, { useState } from 'react';
import { Stack, Alert, AlertTitle, Grid, IconButton } from '@mui/material';
import MyTypography from "../common/Typography"
import CloseIcon from '@mui/icons-material/Close';
const MyAlert = ({ severity, title, message, variant, children }) => {

	const [openalert, setOpenalert] = useState(true);

	const handleCloseAlert = () => {
		setOpenalert(false);
	};

	return (
		<>
			{openalert && (
				<Stack sx={{ width: '100%', p: 0, m: 0 }} spacing={2}>
					<Alert severity={severity} >
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							sx={{
								position: 'absolute',
								right: 8,
								top: 8,
							}}
							onClick={handleCloseAlert}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
						{title && <AlertTitle>{title}</AlertTitle>}

						<Grid container  sx={{ padding: 0, margin: 0 }}>
							<Grid item xs={2}></Grid>
							<Grid item xs={2}><MyTypography value="Alert Type"  sx={{ fontSize: "10px" }}/></Grid>
							<Grid item xs={2}><MyTypography value="Zone" sx={{ fontSize: "10px" }} /></Grid>
							<Grid item xs={2}></Grid>
							<Grid item xs={2}><MyTypography value="Date" sx={{ fontSize: "10px" }} /></Grid>
							<Grid item xs={2}><MyTypography value="Location" sx={{ fontSize: "10px" }}/></Grid>

							<Grid item xs={2} sx={{ fontSize: "10px" }}>{message}</Grid>
							<Grid item xs={2} sx={{ fontSize: "10px" }}>GeoFence IN</Grid>
							<Grid item xs={2} sx={{ fontSize: "10px" }}>Toyota Coralla 216</Grid>
							<Grid item xs={2} sx={{ fontSize: "10px" }}>Anjou Fence Alert</Grid>
							<Grid item xs={2} sx={{ fontSize: "10px" }}>2023/09/16</Grid>
							<Grid item xs={2} sx={{ fontSize: "10px" }}>9855 Rue Colbert</Grid>
						</Grid>
					</Alert>
				</Stack>
			)}
		</>
	);

};
export default MyAlert;
