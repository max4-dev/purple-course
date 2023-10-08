import { API } from "@/helpers/api";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interface/menu.interface";
import { ProductModel } from "@/interface/product.interface";
import { TopLevelCategory, TopPageModel } from "@/interface/top-page.interface";
import { withLayout } from "@/layout/Layout";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

const Type = ({ firstCategory }: TypeProps) => {
  console.log(firstCategory);
  
  return ( <div>Type</div> );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => '/' + m.route),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) =>  {
  if (!params) {
    return {
      notFound: true
    }
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true
    }
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    })
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
      }
    };
  } catch {
    return {
      notFound: true
    }
  }
};

export interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel;
}
