import React, { useState, useEffect, Suspense, lazy, useContext } from "react";
import { useDispatch, useSelector } from "react-redux"
import _, { object } from "underscore";
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LeftBarContext } from '../contexts/LeftBarContext';
import { createTheme, ThemeProvider } from '@mui/material';
import { fetchLeftbar } from '../components/slices/leftbarSlice';
import MyAlert from "../components/common/Alert"

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => {
	console.log('open:', open);
	return {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	};
});
const getRandomSeverity = () => {
	const severities = ['success', 'info', 'warning', 'error'];
	const randomIndex = Math.floor(Math.random() * severities.length);
	return severities[randomIndex];
};

const getRandomMessage = () => {
	const messages = [
		'This is an alert message.',
		'Something important happened!',
		'Please pay attention to this.',
		'An error occurred. Please try again.',
	];
	const randomIndex = Math.floor(Math.random() * messages.length);
	return messages[randomIndex];
};
const theme = createTheme({
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
			},
		},
	},
	palette: {
		primary: {
			main: "#fff"
		},
	}
});
function MenuBar() {
	const { contextValue, setContextValue } = useContext(LeftBarContext);
	const [severity, setSeverity] = useState('');
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();
	const open = useSelector(state => state.open, _.isEqual, false);
	console.log(":contextValue" + contextValue + "==" + open.open)
	const handleDrawerOpen = () => {
		dispatch(fetchLeftbar({ 'open': true }));
		setContextValue(true);
	};
	useEffect(() => {
		const randomSeverity = getRandomSeverity();
		const randomMessage = getRandomMessage();
		setSeverity(randomSeverity);
		setMessage(randomMessage);
	}, []);
	const handleDrawerClose = () => {
		dispatch(fetchLeftbar({ 'open': false }));
		setContextValue(false);
	};
	return <ThemeProvider theme={theme}><AppBar position="fixed" open={open.open} >
		<Toolbar>			
			<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={handleDrawerOpen}
				edge="start"
				sx={{
					marginRight: 5,
					...(open.open && { display: 'none' }),
				}}
			>
				<MenuIcon />
			</IconButton>
			<MyAlert severity={severity} title={severity} variant="filled" message={message}>
			</MyAlert>
		</Toolbar>
	</AppBar></ThemeProvider>
}
export default MenuBar
