import React, { lazy, useState, useMemo, Suspense, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _, { object } from "underscore";
import GoogleMapReact from 'google-map-react';
import { DrawerHeader } from './common/DrawerHeader';

import Popover from '@mui/material/Popover';

import FieldsContainer from './common/FieldsContainer'
import { Formik, Form } from 'formik';
const MyTable = lazy(() => import('./common/Table'));
const MySelect = lazy(() => import('./common/Select'));
const MyBox = lazy(() => import('./common/Box'));
const MyButton = lazy(() => import('./common/Button'));
import useEntityState from "./hooks/useEntityState"
import useGenericData from "./hooks/useGenericData"
import MySkeleton from "./common/Skeleton"
function Home() {
  return <>Home</>
};
export default Home;
