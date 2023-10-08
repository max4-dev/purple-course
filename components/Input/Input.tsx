import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import cn from 'classnames';
import { ForwardedRef, forwardRef } from "react";

const Input = forwardRef(({ error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={cn(styles.inputBox, className)}>
      <input className={cn(styles.input, {[styles.error]: error})} ref={ref} {...props} />
      {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
    </div>
   );
});
 
export default Input;