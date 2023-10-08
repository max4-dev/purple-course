import { Htag } from "@/components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import Tag from "@/components/Tag/Tag";
import styles from "./TopPageComponent.module.css"
import CardData from "@/components/CardData/CardData";
import { TopLevelCategory } from "@/interface/top-page.interface";
import Benefit from "@/components/Benefit/Benefit";
import P from "@/components/P/P";
import Sort from "@/components/Sort/Sort";
import { SortEnum } from "@/components/Sort/Sort.props";
import { useEffect, useReducer, useState } from "react";
import { sortReducer } from "@/components/Sort/sort.reducer";
import Product from "@/components/Product/Product";
import { useScrollY } from "@/hooks/useScrollY";
import { useReducedMotion } from "framer-motion";

const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });const shouldReduceMotion = useReducedMotion();

  const y = useScrollY();
  

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort })
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products })
  }, [products])
  
  return (
    <>
      {<div className={styles.wrapper}>
        <div className={styles.title}>
          <Htag tag='h1'>{page.title}</Htag>
          {products && <Tag color='gray' size='m' aria-label={products.length + ' элементов'}>{products.length}</Tag>}
          <Sort sort={sort} setSort={setSort} />
        </div>
        <div role="list">
          {sortedProducts && sortedProducts.map(p => (<Product role="listitem" layout={shouldReduceMotion ? false : true} product={p} key={p._id} />))}
        </div>
        <div className={styles.hhTitle}>
          <Htag tag='h2'>Вакансии - {page.category}</Htag>
          {products && <Tag color='red' size='m'>hh.ru</Tag>}
        </div>
        <div className={styles.hh}>
          {firstCategory === TopLevelCategory.Courses && <CardData {...page.hh} />}
        </div>
        {page.advantages.length > 0 && (
        <>
          <div className={styles.benefitsTitle}>
            <Htag tag='h2'>Преимущества</Htag>
          </div>
          <div className={styles.benefits}>
            {page.advantages.map((advantage) => <Benefit key={advantage._id} {...advantage} />)}
          </div>
        </>
        )}
        {page.seoText && <div className={styles.seoText} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
        <div className={styles.skillsTitle}>
          <Htag tag='h2'>Получаемые навыки</Htag>
        </div>
        <div className={styles.skills}>
          {page.tags.map((tag, i) => <Tag className={styles.skillsTag} color="primary" key={i}>{tag}</Tag>)}
        </div>
      </div>}
    </> 
  );
}
 
export default TopPageComponent;