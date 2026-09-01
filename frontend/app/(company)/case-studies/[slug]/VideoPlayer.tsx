"use client";
import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({url}: {url: string}) => {
    return (
        <div className='aspect-video rounded-lg overflow-hidden'>
            <ReactPlayer url={url} width={'100%'} height={"100%"} />
        </div>
    );
};

export default VideoPlayer;