import React from "react";

import Sitemapform from "./Sitemapform";
import { getData } from "@/utils/getDate";

const Robotform = async () => {
  const response = await getData({
    slug: `admin/sitemap`,
  });
  const sitemap = typeof response === "string" ? response : "";
  return (
    <div>
      <Sitemapform data={sitemap} />
    </div>
  );
};

export default Robotform;
