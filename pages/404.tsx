import { Htag } from "@/components";
import { withLayout } from "@/layout/Layout";

export function Error404() {

  return (
    <>
      <Htag tag='h1'>Ошибка 404</Htag>
      4444
    </>
  );
}

export default withLayout(Error404);