import { getData } from "@/utils/getData";

export const getDataCategory = async () => {
  try {
    const data = await getData({ url: `api/website/service/type` });
    return data?.data;
  } catch (error) {
    console.error("getData error: ", error);
    return null;
  }
};
