import Header from "./Header/Header";
import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import cn from 'classnames';
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import { FC, useState, KeyboardEvent, useRef } from "react";
import { AppContextProvider, IAppContext } from "@/context/app.context";
import Up from "@/components/Up/Up";

export const Layout = ({children}: LayoutProps) => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLinkDisplayed(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        className={cn(styles.skipLink, {[styles.displayed]: isSkipLinkDisplayed})} tabIndex={0}
        onKeyDown={skipContentAction}
      >
          Сразу к содержанию
        </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main ref={bodyRef} className={styles.body} tabIndex={0} role="main">
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
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