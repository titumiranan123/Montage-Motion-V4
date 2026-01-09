import { getPageSEO } from "@/component/share/getPageSEO";

export async function generateMetadata() {
  return await getPageSEO("refund");
}
const Refundpolicy = () => {
  return (
    <div className="max-w-[996px] mx-auto px-2">
      <h2 className="mb-[60px] mt-40 font-bold poppins text-center text-[36px] text-(--text-primary) ">
        Refund Policy
      </h2>
      <div className="opensans text-(--text-primary)">
        <div className="font-normal  md:text-[16px] md:leading-[22.4px] text-[14px] leading-5 openSans">
          <p>Effective Date: 26 August, 2024</p>
          <p className="mt-4">
            At Montage Motion, we aim to deliver high-quality video editing
            services. However, if you&apos;re not satisfied with our services,
            here&apos;s how our refund policy works:
          </p>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div>
            <h3 className="mb-2 font-bold md:text-[24px] md:leading-[33.6px]  poppins">
              1. Eligibility for Refunds
            </h3>
            <ul className="font-normal md:text-[16px] md:leading-[22.4px] text-[14px] leading-5 list-disc openSans ms-6">
              <li>
                Request: Refund requests must be made within 3 days of the final
                product delivery.
              </li>
              <li>
                Conditions: Refunds are only available if the service was not
                delivered as agreed or does not meet the project specifications.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-bold md:text-[24px] md:leading-[33.6px]  poppins">
              2. Non-Refundable Services
            </h3>
            <p className="font-normal md:text-[16px] md:leading-[22.4px] text-[14px] leading-5 openSans">
              {" "}
              Non-Refundable:Consultation fees, rush fees, and fully completed
              work are non-refundable.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-bold md:text-[24px] md:leading-[33.6px]  poppins">
              3. Partial Refunds
            </h3>
            <p className="font-normal md:text-[16px] md:leading-[22.4px] text-[14px] leading-5 openSans">
              Partial Deliveries: If a project is only partially completed, a
              partial refund may be issued based on the work completed.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-bold md:text-[24px] md:leading-[33.6px]  poppins">
              4. Refund Process
            </h3>
            <p className="font-normal md:text-[16px] md:leading-[22.4px] text-[14px] leading-5 openSans">
              Review: We will review your refund request and notify you of our
              decision within 7 business days.
            </p>
            <p className="font-normal md:text-[16px] md:leading-[22.4px] text-[14px] leading-5 openSans">
              Issuance: Approved refunds will be processed to the original
              payment method.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-bold md:text-[24px] md:leading-[33.6px]  poppins">
              5. Contact Us
            </h3>
            <p className="font-normal md:text-[16px] md:leading-[22.4px] text-[14px] leading-5 openSans">
              For refund requests or questions, contact us at:
            </p>
            <p className="font-normal md:text-[16px] md:leading-[22.4px] text-[14px] leading-5 openSans mt-2">
              Montage Motion <br />
              Email: imonofficial@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refundpolicy;
