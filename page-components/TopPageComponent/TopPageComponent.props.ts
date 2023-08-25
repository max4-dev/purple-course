import { ProductModel } from "@/interface/product.interface";
import { TopLevelCategory, TopPageModel } from "@/interface/top-page.interface";

export interface TopPageComponentProps extends Record<string, unknown> {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel;
}