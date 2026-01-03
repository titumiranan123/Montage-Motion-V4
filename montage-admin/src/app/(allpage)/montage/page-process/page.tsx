import axios from "axios";
import ProcessForm from "./Processform";
import Processwrapper from "./Processwrapper";

export default async function Page({ searchParams }: { searchParams: any }) {
  const { page } = await searchParams;
  const responsce = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/process?type=${page}`
  );
  console.log(responsce.data);
  return (
    <main className="min-h-screen bg-black py-10">
      <Processwrapper data={responsce.data.data} />
    </main>
  );
}
