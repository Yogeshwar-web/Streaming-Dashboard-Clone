// app/components/MovieRow.tsx ('use client')
'use client';
import { Movie } from '../../types/movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
  movies: Movie[];
  categoryTitle: string;
}

export default function MovieRow({ movies, categoryTitle }: MovieRowProps) {
  // Filter out any movies missing a poster path
  const displayMovies = movies.filter(m => m.poster_path);

  if (displayMovies.length === 0) return null;

  return (
    <section className="px-8 mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">{categoryTitle}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4"> 
        {displayMovies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
          />
        ))}
      </div>
    </section>
  );
}