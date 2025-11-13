// lib/tmdb.ts
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  throw new Error("TMDB_API_KEY not found in environment variables");
}

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
  if (!res.ok) throw new Error(`TMDB fetch error: ${res.statusText}`);

  return res.json();
}

// ✅ Make sure these functions return arrays!
export async function fetchPopularMovies() {
  const data = await tmdbFetch("/movie/popular");
  return data.results; // ✅ important
}

export async function fetchTopRatedMovies() {
  const data = await tmdbFetch("/movie/top_rated");
  return data.results; // ✅ important
}

export async function fetchNowPlayingMovies() {
  const data = await tmdbFetch("/movie/now_playing");
  return data.results; // ✅ important
}
