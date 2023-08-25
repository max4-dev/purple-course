import P from "@/components/P/P";
import { Button, Htag } from "../components";
import Tag from "@/components/Tag/Tag";
import { useEffect, useState } from "react";
import Rating from "@/components/Rating/Rating";
import { withLayout } from "@/layout/Layout";
import axios from "axios";
import { MenuItem } from "@/interface/menu.interface";
import { GetStaticProps } from "next";

function Home({ menu, firstCategory }: HomeProps): JSX.Element {
  const [rating, setRating] = useState(4);

  return (
    <>
      <Htag tag='h1'>Текст</Htag>
      <Button appearance="primary" arrow="down">Hello</Button>
      <Button appearance="ghost" arrow="right">Hello</Button>
      <Tag>Tag</Tag>
      <Tag href="#">Tag</Tag>
      <Tag color="primary">Tag</Tag>
      <Tag color="gray">Tag</Tag>
      <Tag color="red">Tag</Tag>
      <Tag color="green">Tag</Tag>

      <Rating isEditable rating={rating} setRating={setRating} />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () =>  {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  })
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
