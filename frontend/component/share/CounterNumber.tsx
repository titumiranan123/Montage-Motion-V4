import { CountingNumber } from "@/components/ui/shadcn-io/counting-number";
import { Plus } from "lucide-react";
import React from "react";

const CounterNumber = ({
  title,
  number,
}: {
  title: string;
  number: number;
}) => {
  return (
    <div className="text-[#C0C9EA]">
      <div className="flex items-center  justify-center">
        <CountingNumber
          number={number}
          inView={true}
          className="md:text-[20px] text-[16px] font-[600] poppins text-center "
          transition={{ stiffness: 100, damping: 30 }}
        />
        <Plus className="md:w-[20px] md:h-[20px] w-[16px] h-[16px] poppins" />
      </div>
      <p className="md:text-[16px] text-[12px]  font-[400] opensans text-center">
        {title}
      </p>
    </div>
  );
};

export default CounterNumber;
<CountingNumber
  number={42069}
  inView={true}
  transition={{ stiffness: 100, damping: 30 }}
/>;
