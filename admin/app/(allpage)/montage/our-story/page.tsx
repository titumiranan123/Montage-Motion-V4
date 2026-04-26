import axios from "axios";
import Storywrapper from "./Storywrapper";

export default async function Page() {

  let responsce
  try {
     const result  = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/our-story?type=about`,
  );
  
  responsce = result?.data?.data?.[0]
  } catch (error) {
    console.log(error)
  }
  // console.log(responsce)
  return (
    <main className="min-h-screen bg-black py-10">
      <Storywrapper data={responsce} />
    </main>
  );
}
