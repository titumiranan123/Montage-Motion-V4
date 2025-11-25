import React from "react";

const page = async ({ params }: { params: any }) => {
  const { serviceurl } = await params;
  return (
    <div>
      <p className="text-white">{serviceurl}</p>
    </div>
  );
};

export default page;
