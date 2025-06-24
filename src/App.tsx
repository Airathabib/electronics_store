import CardList from './components/pages/CardList';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/pages/NotFoundPage/index.tsx';
import Favorites from './components/pages/FavoritesPage/index.tsx';
import Cart from './components/pages/Cart/index.tsx';
import Admin from './components/pages/Admin/index.tsx';
import Layout from './components/Layout/Layout';
import CardInfo from './components/pages/CardInfo/index.tsx';
import styles from './App.module.scss';
import React from 'react';

function App(): React.ReactElement {
  return (
    <div className={styles.MainContainer}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<CardList />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='cart' element={<Cart />} />
          <Route path='admin' element={<Admin />} />
          <Route path='card/:id' element={<CardInfo />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
