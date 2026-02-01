export const getDataCategory = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/website/service/type`
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result?.data;
  } catch (error) {
    console.error("getData error: ", error);
    return null;
  }
};
