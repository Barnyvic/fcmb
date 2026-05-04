import { useState } from 'react';
import { cn } from '../utils/cn';

type AvatarProps = {
  src?: string;
  alt: string;
  className?: string;
};

const fallbackAvatar = '/images/avatar-fallback.png';

export function Avatar({ src, alt, className }: AvatarProps) {
  const [imageSrc, setImageSrc] = useState(src || fallbackAvatar);

  return (
    <img
      className={cn('shrink-0 rounded-full object-cover', className)}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      onError={() => setImageSrc(fallbackAvatar)}
    />
  );
}
