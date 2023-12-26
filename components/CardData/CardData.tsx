import { CardDataProps } from "./CardData.props";
import styles from "./CardData.module.css";
import cn from 'classnames';
import Card from "../Card/Card";
import RateIcon from './star.svg';
import { priceRu } from "@/helpers/helpers";

const CardData = ({ count, juniorSalary, middleSalary, seniorSalary }: CardDataProps) => {
  return (
    <>
      <Card className={styles.count}>
        <p className={styles.text}>Всего вакансий</p>
        <h5 className={styles.countCalue}>{count}</h5>
      </Card>
      <Card className={styles.salary}>
        <div className={styles.salaryInner}>
          <p className={styles.text}>Начальный</p>
          <h5 className={styles.salaryValue}>{juniorSalary && priceRu(juniorSalary)}</h5>
          <div className={styles.rate}>
            <RateIcon className={styles.fill} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>
        <div className={styles.salaryInner}>
          <p className={styles.text}>Средний</p>
          <h5 className={styles.salaryValue}>{middleSalary && priceRu(middleSalary)}</h5>
          <div className={styles.rate}>
            <RateIcon className={styles.fill} />
            <RateIcon className={styles.fill} />
            <RateIcon />
          </div>
        </div>
        <div className={styles.salaryInner}>
          <p className={styles.text}>Профессионал</p>
          <h5 className={styles.salaryValue}>{seniorSalary && priceRu(seniorSalary)}</h5>
          <div className={styles.rate}>
            <RateIcon className={styles.fill} />
            <RateIcon className={styles.fill} />
            <RateIcon className={styles.fill} />
          </div>
        </div>
      </Card>
    </>
   );
};
 
export default CardData;