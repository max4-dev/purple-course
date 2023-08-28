import React from "react";
import { SortEnum, SortProps } from "./Sort.props";
import styles from "./Sort.module.css";
import cn from 'classnames';
import SortIcon from './sort.svg';

const Sort = ({sort, setSort, className, ...props}: SortProps) => {
  return (
    <div className={cn(className, styles.sort)} {...props}>
      <span className={cn({[styles.active]: sort === SortEnum.Rating})} onClick={() => setSort(SortEnum.Rating)}>
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span className={cn({[styles.active]: sort === SortEnum.Price})} onClick={() => setSort(SortEnum.Price)}>
        <SortIcon className={styles.sortIcon} />
        По Цене
      </span>
    </div>
  );
};
 
export default Sort;