import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import styles from '../../styles/Layout.module.css';
import theme from './../MuiComponents/theme';
import Footer from './LayoutComponents/Footer';
import Header from './LayoutComponents/Header';
import Meta from './LayoutComponents/Meta';
import Nav from './LayoutComponents/Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <ThemeProvider theme={theme}>
        <Nav />
        <CssBaseline />
        <div className={styles.container}>
          <main className={styles.main}>
            <Header />
            {children}
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
