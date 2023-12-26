import { TextareaProps } from "./Textarea.props";
import styles from "./Textarea.module.css";
import cn from 'classnames';
import { ForwardedRef, forwardRef } from "react";

const Textarea = forwardRef(({ error, className, ...props }: TextareaProps, ref: any) => {
  return (
    <div className={cn(className, styles.textareaBox)}>
      <textarea className={cn(styles.textarea, { [styles.error]: error })} ref={ref} {...props} />
      {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
 
Textarea.displayName = 'Textarea';
export default Textarea;