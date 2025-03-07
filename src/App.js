import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MySkeleton from './components/common/Skeleton';
const MainLayout = lazy(() => import('./layouts/MainLayout'));
export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Suspense fallback={<MySkeleton/>}> <MainLayout /></Suspense>} />
      </Routes>
    </Router>
  );
}
