import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { SvgIcon } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'red',
    fontSize: 32,
  },
  pintext: {
    backgroundColor: "#008000",
    color: "#fff",
    width: "200px",
    padding: "10px",
    borderRadius: "5px"
  }
}));

const CarMarker = ({ key, lat, lng, address, vehicleName, status, onClick }) => {
  const classes = useStyles();
  const backgroundColor = ((status === "PARKED"? '#ff0000' : '') || (status === "IN_MOVEMENT"? '#008000' : '') || (status === "UNRESPONSIVE"? '#FF681E' : ''));
  return (
    <div onClick={() => onClick({ lat, lng, address, vehicleName })}>
      <SvgIcon className={classes.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 23.044 46"
          width="24"
          height="24"
        >
          <path d="M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z" />
        </svg>
      </SvgIcon>


      <p
        className={classes.pintext}
        style={{ backgroundColor }}
      >
        {vehicleName}
      </p>


    </div>
  );
};
CarMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  vehicleName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default CarMarker;
