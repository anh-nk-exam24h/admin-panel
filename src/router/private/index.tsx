import { lazy } from 'react';
import TestLayout from 'layout/Test/index';
import DashboardContainer from 'pages/Dashboard';
// const ImportQuestionContainer = lazy(() => import('pages/ManageQuestion/Question/ImportQuestion'));
export const PrivateRouter: any[] = [
  {
    path: '/',
    element: DashboardContainer,
  },
  {
    path: 'dashboard',
    element: DashboardContainer,
  },

];
