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
      next: {
        revalidate: 300,
        tags: [`api:${url}`],
      },
    });

    if (!response.ok) {
      return { data: null };
    }

    return await response.json();
  } catch (error) {
    console.error("getData error: ", error);
    return { data: null };
  }
};
