import { FooterProps } from "./Footer.props";
import styles from "./Footer.module.css";
import cn from 'classnames';
import { format } from "date-fns";

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div className={styles.container}>
        <p>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</p>
        <a href="#">Пользовательское соглашение</a>
        <a href="#">Политика конфиденциальности</a>
      </div>
    </footer> 
  );
};
 
export default Footer;