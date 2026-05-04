import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AppRoute } from './enums/routes';
import { PortalPlaceholderPage } from './pages/PortalPlaceholderPage';
import { RegisterPage } from './pages/RegisterPage';
import { UsersPage } from './pages/UsersPage';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to={AppRoute.Register} replace /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'home', element: <PortalPlaceholderPage title="Home" /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'users/:userId', element: <UsersPage /> },
      { path: 'career-interest', element: <PortalPlaceholderPage title="Career Interest" /> },
      { path: 'assessments', element: <PortalPlaceholderPage title="My Assessments" /> },
      { path: 'jobs', element: <PortalPlaceholderPage title="Jobs and Vacancies" /> },
      { path: 'appraisal', element: <PortalPlaceholderPage title="Appraisal" /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
