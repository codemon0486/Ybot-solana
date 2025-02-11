import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '../Pages/Home';
import Earn from '../Pages/Earn';
import DailyBonus from '../Pages/DailyBonus';
import League from '../Pages/League';
import Account from '../Pages/Account';
import Friends from '../Pages/Friends';
import Wallet from '../Pages/Wallet';
import Store from '../Pages/Store';
import FlappyBird from '../Pages/FlappyBird';
import Spin from '../Pages/Spin';

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/earn",
    element: <Earn />,
  },
  {
    path: "/daily-bonus",
    element: <DailyBonus />,
  },
  {
    path: "/league",
    element: <League />,
  },
  {
    path: "/account",
    element: <Account />
  },
  {
    path: "/friends",
    element: <Friends />,
  },
  {
    path: "/wallet",
    element: <Wallet />,
  },
  {
    path: "/store",
    element: <Store />
  },
  {
    path: "/flappy-bird",
    element: <FlappyBird />
  },
  {
    path: "/spin",
    element: <Spin />
  }
]);