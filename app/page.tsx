// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import Header from './components/Header';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies
} from '@/lib/tmdb';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default async function HomePage() {
  const popularMovies: Movie[] = await fetchPopularMovies();
  const topRatedMovies: Movie[] = await fetchTopRatedMovies();
  const nowPlayingMovies: Movie[] = await fetchNowPlayingMovies();

  // Helper to render movie grid
  const renderMovieGrid = (movies: Movie[]) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div className="cursor-pointer hover:scale-105 transition-transform">
            {movie.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                className="rounded-lg"
              />
            )}
            <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-4 space-y-12">
        {/* Popular Movies */}
        <section>
          <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
          {renderMovieGrid(popularMovies)}
        </section>

        {/* Top Rated Movies */}
        <section>
          <h1 className="text-3xl font-bold mb-4">Top Rated Movies</h1>
          {renderMovieGrid(topRatedMovies)}
        </section>

        {/* Now Playing Movies */}
        <section>
          <h1 className="text-3xl font-bold mb-4">Now Playing</h1>
          {renderMovieGrid(nowPlayingMovies)}
        </section>
      </main>
    </div>
  );
}
