/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Imageslider from './Teamimageslider';

const TeamimageSection = ({ data }:{data:any}) => {
    return (
        <div className='space-y-6 sectionGap'>
            <Imageslider data={data} scrollDirection = "left" />
            <Imageslider data={data} scrollDirection = "right" />
        </div>
    );
};

export default TeamimageSection;