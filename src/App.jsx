import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import ComingSoonPage from './pages/DisasterPlaceholder';

const protectedRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/landslide', element: <ComingSoonPage disaster="landslide" /> },
  { path: '/forest-fire', element: <ComingSoonPage disaster="forest-fire" /> },
  { path: '/cyclone', element: <ComingSoonPage disaster="cyclone" /> },
];

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
