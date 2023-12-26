import { ButtonProps } from "./Button.props";
import styles from './Button.module.css';
import cn from 'classnames';

import ArrowIcon from 'public/images/icons/arrow-button.svg';
import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export const Button = ({ children, appearance, arrow = 'none', className }: ButtonProps) => {
  const scale = useMotionValue(1);

  useEffect(() => {
    // console.log(scale);
    scale.onChange(s => console.log(s)
    )
    
  }, []);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        style={{ scale }}
        className={cn(styles.button, className, {[styles.primary]:  appearance ==='primary'}, {[styles.ghost]: appearance  ==='ghost'})}
      >
        {children}
        {arrow !== 'none' && <span className={cn(styles.arrow, {[styles.down]: arrow === 'down'})}><ArrowIcon /></span>}
      </motion.button>
    </>
  );
};
