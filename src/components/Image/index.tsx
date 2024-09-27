import NextImage from 'next/image';

export default function Image({
  src,
  width,
  height,
  alt,
  fill,
  className,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  fill?: boolean;
  className?: string;
}) {
  return (
    <NextImage
      className={className}
      src={src}
      fill={fill}
      width={width}
      height={height}
      alt={alt}
    />
  );
}
