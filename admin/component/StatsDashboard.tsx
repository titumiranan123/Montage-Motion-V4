
import React from "react";

interface StatsCardProps {
  title: string;
  value: number;
}

const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-[350px]">
      <h3 className="text-[#1FB5DD] text-xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-gray-800 mb-2">{value}</p>
    </div>
  );
};



export default StatsCard;
