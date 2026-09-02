import axios from "axios";
import Servicewrapper from "./Servicewrapper";

const Page = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const { page } = await searchParams;
  const responsce = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/our-service${
      page ? `?type=${encodeURIComponent(page)}` : ""
    }`,
  );

  return (
    <main className="min-h-screen  py-10">
      <Servicewrapper
        data={responsce?.data?.data}
        key={page ?? "default"}
        page={page}
      />
    </main>
  );
};

export default Page;
