import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { businessSliceReducer } from "./components/slices/businessSlice";
import { locationSliceReducer } from "./components/slices/locationSlice";
import { leftbarSliceReducer } from "./components/slices/leftbarSlice";
import { apiSlice } from './components/services/business';
import { authSlice } from './components/services/auth';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath, authSlice.reducerPath]
};
const rootReducer = combineReducers({
  business: businessSliceReducer,
  open: leftbarSliceReducer,
  location: locationSliceReducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authSlice.middleware),
  devTools: true
});

setupListeners(store.dispatch);
export default store;


