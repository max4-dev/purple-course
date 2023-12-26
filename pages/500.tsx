import { Htag } from "@/components";
import { withLayout } from "@/layout/Layout";

function Error404() {

  return (
    <>
      <Htag tag='h1'>Ошибка 500</Htag>
      4444
    </>
  );
}

export default withLayout(Error404);