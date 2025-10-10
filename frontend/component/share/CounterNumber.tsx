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
          className="text-[20px] font-[600] poppins text-center "
          transition={{ stiffness: 100, damping: 30 }}
        />
        <Plus className="w-[20px] h-[20px] poppins" />
      </div>
      <p className="text-[16px] font-[400] opensans text-center">{title}</p>
    </div>
  );
};

export default CounterNumber;
<CountingNumber
  number={42069}
  inView={true}
  transition={{ stiffness: 100, damping: 30 }}
/>;
