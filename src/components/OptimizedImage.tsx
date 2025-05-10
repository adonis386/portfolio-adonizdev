interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage = ({ src, alt, className = '' }: OptimizedImageProps) => {
  // Obtener el nombre base
  const baseName = src.substring(0, src.lastIndexOf('.'));

  return (
    <picture>
      {/* Versión WebP */}
      <source srcSet={`${baseName}.webp`} type="image/webp" />
      {/* Versión original como fallback */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
      />
    </picture>
  );
};
