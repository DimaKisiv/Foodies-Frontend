import React from "react";

/**
 * Generic responsive image with basic retina srcset.
 * Since we don't have separate retina assets, it uses the same source for 1x and 2x.
 */
const ResponsiveImage = ({
  src,
  alt,
  className,
  fallbackSrc,
  sizes,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  style,
  ...rest
}) => {
  const finalSrc = src || fallbackSrc || "";
  const finalSrcSet = finalSrc ? `${finalSrc} 1x, ${finalSrc} 2x` : undefined;

  const handleError = (e) => {
    if (!fallbackSrc) return;
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallbackSrc;
    e.currentTarget.srcset = `${fallbackSrc} 1x, ${fallbackSrc} 2x`;
  };

  return (
    <img
      src={finalSrc}
      srcSet={finalSrcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      style={style}
      onError={handleError}
      {...rest}
    />
  );
};

export default ResponsiveImage;
