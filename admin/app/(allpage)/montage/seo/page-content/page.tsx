/* eslint-disable @typescript-eslint/no-explicit-any */
import SeoMetaForm from "./SeoMetaform";
import { getData } from "@/utils/getDate";

const PageSeo = async ({ searchParams }: { searchParams: any }) => {
  const { page_name } = await searchParams;

  const response = await getData({
    slug: `seo/${page_name ? page_name : "home"}`,
  });
  const category = await getData({
    slug: `website/service/type`,
  });
  const serviceTypes = category.map((item: any) => item.service_type);
  return (
    <div>
      {" "}
      <SeoMetaForm initialData={response} type={serviceTypes} />{" "}
    </div>
  );
};

export default PageSeo;
