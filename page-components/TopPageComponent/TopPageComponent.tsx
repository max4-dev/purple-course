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

const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps) => {
  console.log({ page, products, firstCategory });
  
  return ( 
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Htag tag='h1'>{page.title}</Htag>
          {products && <Tag color='gray' size='m'>{products.length}</Tag>}
          <Sort sort={SortEnum.Rating} setSort={() => {}} />
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
      </div>
    </> 
  );
}
 
export default TopPageComponent;