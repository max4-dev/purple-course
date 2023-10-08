import { ButtonIconProps, icons } from "./ButtonIcon.props";
import styles from "./ButtonIcon.module.css";
import cn from "classnames";

const ButtonIcon = ({appearance = 'white', icon, className, ...props}: ButtonIconProps) => {
  const IconComp = icons[icon]

  return ( 
    <button 
      className={cn(styles.button, {[styles.primary]: appearance === 'primary', [styles.white]: appearance === 'white'}, className)}
      {...props}
    >
      <IconComp />
    </button>
   );
};

export default ButtonIcon;