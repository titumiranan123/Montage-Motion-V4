import FirstSection from "./FirstSection";
import "./contact.css";
import Locationsection from "./Locationsection";
import CalendlyContact from "./CalendlyContact";
import { getPageSEO } from "@/component/share/getPageSEO";

export async function generateMetadata() {
  return await getPageSEO("contact");
}
const ContactPage = async () => {
  return (
    <div className="mt-2">
      <div className="headerbg pb-15 pt-40 rounded-[40px] max-w-360 px-2 xl:px-15  mx-auto">
        <FirstSection />
      </div>
      <Locationsection />
      <div className="candly sectionGap py-15 container  rounded-[40px] ">
        <style>
          {`
            .candly{
              background: linear-gradient(180deg, #E9F8FC 0%, #F6FDFF 100%);
            }
            `}
        </style>
        <CalendlyContact />
      </div>
    </div>
  );
};

export default ContactPage;
