import { BenefitProps } from "./Benefit.props";
import styles from "./Benefit.module.css";
import cn from 'classnames';
import { Htag } from "../Htag/Htag";
import P from "../P/P";
import Check from './check.svg';

const Benefit = ({ title, description, _id }: BenefitProps) => {
  return (
    <div className={styles.benefit}>
      <div className={styles.benefitDecor}>
        <Check />
      </div>
      <div className={styles.benefitContent}>
        <Htag className={styles.title} tag="h3">{title}</Htag>
        <P>{description}</P>
      </div>
    </div>
   );
};
 
export default Benefit;