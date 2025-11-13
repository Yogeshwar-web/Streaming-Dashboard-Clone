// app/components/HeroBanner.tsx 
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../../types/movie';

interface HeroBannerProps {
  movie: Movie;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'; 

export default function HeroBanner({ movie }: HeroBannerProps) {
  const imagePath = `${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`;

  return (
    <section className="relative h-[60vh] lg:h-[80vh]">
      <Image 
        src={imagePath} 
        alt={movie.title || movie.name || 'Hero Banner'} 
        fill 
        priority // Load this main image first
        className="object-cover" 
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent/50 to-transparent"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 text-white max-w-3xl z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{movie.title || movie.name}</h1>
        <p className="text-lg mb-6 hidden md:block">
          {movie.overview ? `${movie.overview.substring(0, 180)}...` : 'No overview available.'}
        </p>
        <Link 
          href={`/movie/${movie.id}`} 
          className="inline-block px-6 py-3 bg-red-600 rounded font-bold hover:bg-red-700 transition duration-200"
        >
          Watch Now
        </Link>
      </div>
    </section>
  );
}