import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import cn from 'classnames';

const Input = ({className, ...props}: InputProps) => {
  return (
    <input className={cn(className, styles.input)} {...props} />
   );
};
 
export default Input;