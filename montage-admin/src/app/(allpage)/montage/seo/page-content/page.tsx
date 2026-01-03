import { getServerSession } from "next-auth";
import SeoMetaForm from "./SeoMetaform";
import { authOptions } from "@/component/authoption";
import { getData } from "@/utils/getDate";

const PageSeo = async ({ searchParams }: { searchParams: any }) => {
  const { page_name } = await searchParams;

  const response = await getData({
    slug: `seo/${page_name ? page_name : "home"}`,
  });

  return (
    <div>
      {" "}
      <SeoMetaForm initialData={response} token={""} />{" "}
    </div>
  );
};

export default PageSeo;
