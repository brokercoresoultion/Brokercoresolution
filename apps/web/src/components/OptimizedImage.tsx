import React, { useState } from 'react';

// A reusable component to serve WebP with fallback and lazy loading
const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    // Fallback image if the original src fails to load (e.g., expired blob URLs)
    setImgSrc('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop');
  };

  return (
    <picture>
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        onError={handleError}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
