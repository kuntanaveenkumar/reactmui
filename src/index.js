import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { StyledEngineProvider } from '@mui/material/styles';
import './css/style.default.less';
const App = lazy(() => import('./App'));
import store from './store';
import { Provider } from 'react-redux';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
//const queryClient = new QueryClient();
const persistor = persistStore(store);
i18next.init({
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v3',
  lng: localStorage.getItem("defaultlang") || 'en',
  resources: {
    en: {
      common: common_en
    },
    fr: {
      common: common_fr
    },
  },
});

//<QueryClientProvider client={queryClient}>
ReactDOM.render(<StyledEngineProvider injectFirst><Provider store={store}><PersistGate loading={null} persistor={persistor}><I18nextProvider i18n={i18next}><Suspense fallback={<div>Loading...</div>}><App /></Suspense></I18nextProvider></PersistGate></Provider></StyledEngineProvider>, document.getElementById('app'));
module.hot.accept();
