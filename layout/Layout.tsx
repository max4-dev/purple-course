import Header from "./Header/Header";
import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import cn from 'classnames';
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import { FC } from "react";
import { AppContextProvider, IAppContext } from "@/context/app.context";

export const Layout = ({children}: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>
        {children}
      </div>
      <Footer className={styles.footer} />
    </div> 
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FC<T>) => {
  return function withLayoutComponent(props: T) {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};