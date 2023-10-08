import { ReviewModel } from "@/interface/product.interface";
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: ReviewModel;
  isOpened: boolean;
}