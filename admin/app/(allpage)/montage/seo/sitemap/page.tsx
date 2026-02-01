import React from "react";

import Sitemapform from "./Sitemapform";
import { getData } from "@/utils/getDate";

const Robotform = async () => {
  const response = await getData({
    slug: `admin/sitemap`,
  });
  return (
    <div>
      <Sitemapform data={response} />
    </div>
  );
};

export default Robotform;
