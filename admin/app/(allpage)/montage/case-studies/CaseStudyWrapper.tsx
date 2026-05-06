/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import CaseStudyCard from './CaseCard';
import Link from 'next/link';

const CaseStudyWrapper = ({ data }: { data: any[] }) => {
    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold">Case Study</h1>
                    <p className="text-gray-400">Manage your Case Study</p>
                </div>

                <div className="flex items-center gap-4">

                    {/* Add section */}
                    <Link
                    href={'/montage/case-studies/create'}
                        // onClick={() => {
                        //   setExistingData(undefined);
                        //   setItemOpen(true);
                        // }}
                        className="bg-[#1FB5DD] text-white py-2 px-6 rounded-lg"
                    >
                        Add Case Study
                    </Link>
                </div>
            </div>
            {
                data?.map((item: any) => (<CaseStudyCard key={item?.id} data={item} />))
            }
        </div>
    );
};

export default CaseStudyWrapper;