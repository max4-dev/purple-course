import { HeaderProps } from "./Header.props";
import cn from 'classnames';
import Logo from '../logo.svg';
import styles from "./Header.module.css";
import ButtonIcon from "@/components/ButtonIcon/ButtonIcon";
import { motion, useReducedMotion } from "framer-motion";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  

  const router = useRouter();

  useEffect(() => {
    setIsOpened(false)
  }, [router.asPath])
  

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: shouldReduceMotion ? {duration: 0} : {
        stiffness: 20
      }
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: '100%',
      transition: shouldReduceMotion ? {duration: 0} : {}
    }
  }

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Logo />
      <ButtonIcon appearance="white" icon="menu" onClick={() => setIsOpened(true)} />
      <motion.div variants={variants} initial='closed' animate={isOpened ? 'opened' : 'closed'} className={styles.mobileMenu}>
        <Sidebar />
        <ButtonIcon className={styles.menuClose} appearance="white" icon="close" onClick={() => setIsOpened(false)} />
      </motion.div>
    </header> 
  );
};
 
export default Header;