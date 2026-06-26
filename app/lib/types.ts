export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  slug: string;
};

export type ProductDetail = {
  name: string;
  tech: string[];
  price: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  images: string[];
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
};

export type Testimonial = {
  id: number;
  title: string;
  cat: string;
  image: string;
};

export type Props = {
  pageSize: number;
};


export type ProductDetailExtended = ProductDetail & {
  images: string[];
};
