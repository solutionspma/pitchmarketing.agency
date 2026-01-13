'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PexelsImageProps {
  query: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallbackUrl?: string;
}

export default function PexelsImage({
  query,
  alt,
  className = '',
  width = 800,
  height = 600,
  priority = false,
  fallbackUrl,
}: PexelsImageProps) {
  const [imageUrl, setImageUrl] = useState<string>(fallbackUrl || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(`/api/pexels/search?query=${encodeURIComponent(query)}&per_page=1`);
        if (!response.ok) throw new Error('Failed to fetch image');
        
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
          setImageUrl(data.photos[0].src.large);
        } else if (fallbackUrl) {
          setImageUrl(fallbackUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading Pexels image:', err);
        if (fallbackUrl) {
          setImageUrl(fallbackUrl);
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [query, fallbackUrl]);

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-800 ${className}`} style={{ width, height }}>
        <div className="h-full w-full flex items-center justify-center">
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`bg-gray-800 ${className}`} style={{ width, height }}>
        <div className="h-full w-full flex items-center justify-center">
          <span className="text-gray-600">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
