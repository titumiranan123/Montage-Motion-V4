import React from "react";
import RobotsTxtForm from "./Robotform";
import { getData } from "@/utils/getDate";

const Robotform = async () => {
  const data = await getData({ slug: "admin/robots" });
  console.log("data", data);
  return (
    <div>
      <RobotsTxtForm data={data} />
    </div>
  );
};

export default Robotform;
