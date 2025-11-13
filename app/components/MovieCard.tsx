// app/components/MovieCard.tsx ('use client')
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
}

// Define common image base path (or pass as prop)
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342'; 

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.png';

  return (
    <Link 
      href={`/movie/${movie.id}`} 
      className="min-w-[150px] w-[150px] relative transition-transform duration-300 ease-out 
                 transform hover:scale-105 hover:z-20 shadow-xl rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="w-[150px] h-[225px]">
        <Image
          src={posterUrl}
          alt={movie.title || movie.name || 'Movie Poster'}
          width={150}
          height={225}
          className="object-cover rounded-lg"
          priority={false} // Only prioritize key images
        />
      </div>
    </Link>
  );
}