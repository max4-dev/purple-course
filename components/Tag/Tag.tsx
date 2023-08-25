import { TagProps } from "./Tag.props";
import styles from "./Tag.module.css";
import cn from 'classnames';

const Tag = ({size = 's', children, color = 'ghost', href, className, ...props}: TagProps) => {
  return ( 
    <div className={cn(className, styles.tag, {[styles.s]: size === 's'}, 
    {[styles.m]: size === 'm'},
    {[styles.ghost]: color === 'ghost'},
    {[styles.red]: color === 'red'},
    {[styles.gray]: color === 'gray'},
    {[styles.green]: color === 'green'},
    {[styles.primary]: color === 'primary'},
    )} {...props}>
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
   );
};
 
export default Tag;