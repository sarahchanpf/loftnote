import { redirect } from "next/navigation";

type SearchParams = {
  q?: string;
  eventType?: string;
  city?: string;
  date?: string;
  genre?: string | string[];
  minPrice?: string;
  maxPrice?: string;
};

export default async function BrowseRedirect({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.city) search.set("city", params.city);
  if (params.eventType) search.set("eventType", params.eventType);
  if (params.date) search.set("date", params.date);
  const genres = Array.isArray(params.genre)
    ? params.genre
    : params.genre
      ? [params.genre]
      : [];
  genres.forEach((g) => search.append("genre", g));

  const qs = search.toString();
  redirect(qs ? `/?${qs}` : "/");
}
