// app/movie/[id]/page.tsx
import { fetchMovieById } from '@/Lib/tmdb';
import Image from 'next/image';
import Header from '../../components/Header';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface PageProps {
  params: Promise<{ id: string }>; // App Router passes params as Promise
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params; // unwrap promise

  const movie: Movie | null = await fetchMovieById(id);

  if (!movie) {
    return (
      <div className="p-4 text-center">
        <Header />
        <p className="text-xl mt-4">Movie not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-lg"
            />
          )}
          <div>
            <p className="mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
            <p className="mb-2"><strong>Rating:</strong> {movie.vote_average}</p>
            <p className="mt-4">{movie.overview}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
