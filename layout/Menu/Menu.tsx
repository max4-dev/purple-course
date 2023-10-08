'use client'

import { useContext, KeyboardEvent, useState } from "react";
import styles from "./Menu.module.css";
import cn from 'classnames';
import { AppContext } from "@/context/app.context";
import { FirstLevelMenuItem, PageItem } from "@/interface/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "@/helpers/helpers";
import { motion, useReducedMotion } from "framer-motion"

const Menu = () => {
  const {menu, setMenu, firstCategory} = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      transition: shouldReduceMotion ? {} : {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: {}
  }

  const variantsChildren = {
    visible: {
      display: 'block',
      height: 'auto',
      marginBottom: 8,
      opacity: 1
    },
    hidden: {
      display: 'none',
      opacity: shouldReduceMotion ? 1 : 0,
      marginBottom: 0,
      height: 0,
    }
  }

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        setAnnounce(m.isOpened ? 'closed' : 'opened')
        m.isOpened = !m.isOpened;
      }
      return m;
    }))
  }

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  }

  const buildFirstLevel = () => {
    return (
      <ul>
        {firstLevelMenu.map((m) => (
          <li className={ styles.firstLevelBlock } aria-expanded={m.id === firstCategory} key={m.id}>
            <Link href={`/${m.route}`}>
              <div className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id === firstCategory
              })}>
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    )
  }

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((m) => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }
          return(
          <li key={m._id.secondCategory}>
            <button className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)} onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)} aria-expanded={m.isOpened}>
              {m._id.secondCategory}
            </button>
            <motion.ul
              layout
              variants={variants}
              initial={m.isOpened ? 'visible' : 'hidden'}
              animate={m.isOpened ? 'visible' : 'hidden'}
              className={cn({[styles.secondLevelBlock]: m.isOpened})}
            >
              {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
            </motion.ul>
          </li>
        )})}
      </ul>
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      pages.map((p) => (
        <motion.li variants={variantsChildren} key={p._id}>
          <Link tabIndex={isOpened ? 0 : -1} className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
          })} href={`/${route}/${p.alias}`} aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}>
            {p.category}
          </Link>
        </motion.li>
      ))
    )
  }

  return (
    <nav className={styles.menu} role="navigation">
      {announce && <span className="visualyHidden" role="log">{announce === 'opened' ? 'Развернуто' : 'Свернуто'}</span>}
      {buildFirstLevel()}
    </nav> 
  );
};
 
export default Menu;