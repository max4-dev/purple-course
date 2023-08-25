import { PProps } from "./P.props";
import styles from "./P.module.css";
import cn from 'classnames';

const P = ({size = 'm', children, className, ...props}: PProps) => {
  return ( 
    <p className={cn(className, styles.p, {[styles.ps]: size === 's'}, {[styles.pl]: size === 'l'})}>{children}</p>
   );
};
 
export default P;