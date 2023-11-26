import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export function LazyLoad({image, imageLqip, alt, width, height, className, id}) {

    return <LazyLoadImage 
            id={id}
            alt={alt}
            width={width}
            effect="blur"
            height={height}
            placeholderSrc={imageLqip}
            src={image} 
            // onClick={EnlargeImg({id})}
            className={className ? className: undefined}
            />
}
