/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Imageslider from './Teamimageslider';

const TeamimageSection = ({ data }:{data:any}) => {
    const images = Array.isArray(data) ? data : [];
    if (!images.length) return null;

    return (
        <div className='space-y-6 sectionGap '>
            <Imageslider data={images} scrollDirection = "left" />
            <Imageslider data={images} scrollDirection = "right" />
        </div>
    );
};

export default TeamimageSection;
