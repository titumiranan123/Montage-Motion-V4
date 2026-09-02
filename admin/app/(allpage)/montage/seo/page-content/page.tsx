import SeoMetaForm from "./SeoMetaform";
import { getData } from "@/utils/getDate";

const PageSeo = async ({
  searchParams,
}: {
  searchParams: Promise<{ page_name?: string }>;
}) => {
  const { page_name } = await searchParams;

  const response = await getData({
    slug: `seo/${page_name ? page_name : "home"}`,
  });
  const category = await getData({
    slug: `website/service/type`,
  });
  const serviceTypes = Array.isArray(category)
    ? category
        .map((item: { service_type?: string }) => item.service_type)
        .filter((item): item is string => Boolean(item))
    : [];
  return (
    <div>
      <SeoMetaForm
        initialData={Array.isArray(response) ? undefined : response}
        type={serviceTypes}
      />
    </div>
  );
};

export default PageSeo;
