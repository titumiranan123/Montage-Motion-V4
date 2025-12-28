export const getData = async ({
  url,
  headers = {},
}: {
  url: string;
  headers?: Record<string, string>;
}) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getData error: ", error);
    return [];
  }
};
