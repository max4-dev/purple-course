import { CardProps } from "./Card.props";
import styles from "./Card.module.css";
import cn from 'classnames';

const Card = ({color = 'white', children, className, ...props}: CardProps) => {
  return (
    <div className={cn(styles.card, className, {[styles.accent]: color === 'accent'})}>
      {children}
    </div>
   );
};
 
export default Card;