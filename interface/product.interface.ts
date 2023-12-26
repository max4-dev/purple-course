export interface ProductModel {
  [x: string]: string;
  _id: string;
  categories: string;
  tags: string;
  title: string;
  image: string;
  description: string;
  link: string;
  price: string;
  credit: string;
  oldPrice: string;
  characteristics: string;
  advantages: string;
  initialRating: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
  html: string;
  blog: string;
  companyId: string;
  clicks: string;
  reviews: any;
  reviewCount: string;
  reviewAvg: string;
  length: string;
}

export interface ReviewModel {
  _id: string;
  name: string;
  title: string;
  description: string;
  rating: number;
  productId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Blog {
  text: string;
  _id: string;
  bigImage?: string;
}

export interface ProductCharacteristic {
  name: string;
  value: string;
}