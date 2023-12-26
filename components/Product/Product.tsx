/* eslint-disable react/display-name */
import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import cn from 'classnames';
import Card from "../Card/Card";
import Rating from "../Rating/Rating";
import Tag from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, priceRu } from "@/helpers/helpers";
import Divider from "../Divider/Divider";
import { ForwardedRef, MouseEvent, forwardRef, useRef, useState } from "react";
import Review from "../Review/Review";
import { ReviewModel } from "@/interface/product.interface";
import ReviewForm from "../ReviewForm/ReviewForm";
import { motion } from 'framer-motion'

const Product = motion(forwardRef(({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [isReviewOpened, setIsReviewOpened] = useState(true);
  const reviewRef = useRef<HTMLDivElement>(null);
  const variants = {
    visible: {
      height: 'auto',
      opacity: 1
    },
    hidden: {
      height: 0,
      opacity: 0
    }
  }

  const scrollToReview = (e: MouseEvent) => {
    e.preventDefault();

    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    reviewRef.current?.focus();
  }

  return (
    <div className={className} ref={ref} {...props}>
      <Card className={cn(className, styles.product)}>
        <div className={styles.logo}>
          <img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} width={70} height={70} alt={product.title} />
        </div>
        <h5 className={styles.title}>
          {product.title}
        </h5>
        <div className={styles.price}>
          <div>
            <span className="visualyHidden">Цена</span>
            {priceRu(product.price)}
          </div>
          {product.oldPrice && 
          <Tag className={styles.oldPrice} color='green'>
            <span className="visualyHidden">Скидка</span>
            {priceRu(product.price - product.oldPrice)}
          </Tag>}
        </div>
        <div className={styles.credit}>
          <span className="visualyHidden">кредит</span>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating} tabIndex={0}>
          <span className="visualyHidden">{'Рейтинг' + product.reviewAvg ?? product.initialRating}</span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((c: any) => <Tag className={styles.category} color="ghost" key={c}>{c}</Tag>)}
        </div>
        <div className={styles.priceTitle} aria-hidden>
          цена
        </div>
        <div className={styles.creditTitle} aria-hidden>
          в кредит
        </div>
        <div className={styles.ratingTitle}>
          <a onClick={scrollToReview} href="#">
            <span>{product.reviewCount}</span>
            {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>
          {product.description}
        </div>
        <div className={styles.feature}>
          {product.characteristics.map((c: any) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && <div className={styles.advantages}>
            <div className={styles.advTitle}>Преимущества</div>
            {product.advantages}
          </div>}
          {product.disadvantages && <div className={styles.disadvantages}>
            <div>Недостатки</div>
            {product.disadvantages}
          </div>}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance='primary'>Узнать подробнее</Button>
          <Button className={styles.reviewButton} appearance='ghost' arrow={isReviewOpened ? 'down' : 'right'} onClick={() =>setIsReviewOpened(prevState => !prevState)} aria-expanded={isReviewOpened}>Читать отзывы</Button>
        </div>
      </Card>
      <motion.div variants={variants} initial={isReviewOpened ? 'visible' : 'hidden'} animate={isReviewOpened ? 'visible' : 'hidden'}>
        <Card className={cn(styles.reviews)} color="accent" ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}>
          {product.reviews.map((review: ReviewModel) => 
            <div key={review._id}>
              <Review review={review} key={review._id} isOpened={isReviewOpened} />
              <Divider />
            </div>
          )}
          <ReviewForm isOpened={isReviewOpened} productId={product._id} />
        </Card>
      </motion.div>
    </div>
   );
}));

Product.displayName = 'Product';
export default Product;