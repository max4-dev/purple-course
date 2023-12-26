import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: any;
}