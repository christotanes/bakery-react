import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export function LazyLoad({image, imageLqip, alt, width, height, className}) {
    return <LazyLoadImage 
            alt={alt}
            width={width}
            effect="blur"
            height={height}
            placeholderSrc={imageLqip}
            src={image} 
            className={className ? className: undefined}
            />
}
