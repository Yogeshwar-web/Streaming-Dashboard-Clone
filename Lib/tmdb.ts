// lib/tmdb.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  throw new Error("TMDB_API_KEY not found in environment variables");
}

// Generic fetch helper
async function tmdbFetch(path: string, params?: Record<string, string | number>) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY!);
  url.searchParams.set("language", "en-US");

  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, String(value))
    );
  }

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  
  // Return null instead of throwing if 404
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`TMDB fetch error: ${res.statusText}`);

  return res.json();
}

// ✅ Fetch lists
export async function fetchPopularMovies() {
  const data = await tmdbFetch("/movie/popular");
  return data?.results || [];
}

export async function fetchTopRatedMovies() {
  const data = await tmdbFetch("/movie/top_rated");
  return data?.results || [];
}

export async function fetchNowPlayingMovies() {
  const data = await tmdbFetch("/movie/now_playing");
  return data?.results || [];
}

// ✅ Fetch single movie by ID
export async function fetchMovieById(id: string) {
  return tmdbFetch(`/movie/${id}`);
}
