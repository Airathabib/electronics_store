import { Outlet } from 'react-router-dom';
import Header from '../pages/Header/';
import Footer from '../pages/Footer';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <div className={styles.LinkContainer}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
