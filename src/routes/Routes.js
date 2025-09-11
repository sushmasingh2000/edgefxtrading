// src/routes/routes.jsx
import Dashboard from '../dashboard/Dashboard';
import Activation from '../dashboard/pages/Activation';
import Fund from '../dashboard/pages/Fund/Fund';
import FundTransfer from '../dashboard/pages/Fund/Transfer';
import Level from '../dashboard/pages/income/Level';
import REWARD from '../dashboard/pages/income/REWARD';
import Salryfn from '../dashboard/pages/income/Salary';
import MainLayout from '../dashboard/pages/Layout/MainLayout';
import Downline from '../dashboard/pages/network/Downline';
import JoinMember from '../dashboard/pages/network/JoinMember';
import Profile from '../dashboard/pages/Profile';
import Team from '../dashboard/pages/TeamTree/Team';
import TradingRegistration from '../dashboard/pages/TradingRegistration';
import Wallet from '../dashboard/pages/Wallet';
import Withdrawal from '../dashboard/pages/Withdrawal';

export const routes = [
  {
    path: '/dashboard',
    element: ( <MainLayout><Dashboard /> </MainLayout>),
  },
   {
    path: '/trading_registration',
    element: (<MainLayout><TradingRegistration /> </MainLayout>),
  },
  
  {
    path: '/fund',
    element: (<MainLayout><Fund /> </MainLayout>),
  },
   {
    path: '/income/level',
    element: (<MainLayout><Level /> </MainLayout>),
  },
   {
    path: '/income/roi',
    element: (<MainLayout><REWARD /> </MainLayout>),
  },
   {
    path: '/income/direct',
    element: (<MainLayout><Salryfn /> </MainLayout>),
  },
   {
    path: '/activation',
    element: (<MainLayout><Activation /> </MainLayout>),
  },
  {
    path: '/wallet',
    element: (<MainLayout><Wallet /> </MainLayout>),
  },
   {
    path: '/profile',
    element: (<MainLayout><Profile /> </MainLayout>),
  },
   {
    path: '/withdrawal',
    element: (<MainLayout><Withdrawal /> </MainLayout>),
  },
   {
    path: '/fund-tranfer',
    element: (<MainLayout><FundTransfer /> </MainLayout>),
  },
    {
    path: '/referral',
    element: (<MainLayout><JoinMember /> </MainLayout>),
  },
   {
    path: '/team',
    element: (<MainLayout><Team /> </MainLayout>),
  },
   {
    path: '/downline',
    element: (<MainLayout><Downline /> </MainLayout>),
  },
  
];
