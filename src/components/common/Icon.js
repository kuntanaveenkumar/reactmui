import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DevicesIcon from '@mui/icons-material/Devices';
import AlarmIcon from '@mui/icons-material/Alarm';
import MapIcon from '@mui/icons-material/Map';
import PaymentIcon from '@mui/icons-material/Payment';
import CarRentalIcon from '@mui/icons-material/CarRental';
import PersonIcon from '@mui/icons-material/Person';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
const Icon = ({ icon, ...props }) => {
  switch (icon) {
    case 'chevron-left':
      return <ChevronLeftIcon {...props} />;
    case 'customers':
      return <PersonIcon {...props} />;
    case 'directions-car':
      return <DirectionsCarIcon {...props} />;
    case 'supervised-user-circle':
      return <SupervisedUserCircleIcon {...props} />;
    case 'miscellaneous-services':
      return <MiscellaneousServicesIcon {...props} />;
    case 'devices':
      return <DevicesIcon {...props} />;
    case 'alarm':
      return <AlarmIcon {...props} />;
    case 'map':
      return <MapIcon {...props} />;
    case 'payment':
      return <PaymentIcon {...props} />;
    case 'play':
      return <PlayCircleOutlineIcon {...props} fontSize="large" />;
    case 'pause':
      return <PauseCircleOutlineIcon {...props} fontSize="large" />;
    case 'carrental':
      return <CarRentalIcon {...props} />;
    default:
      return null;
  }
};

export default Icon;
