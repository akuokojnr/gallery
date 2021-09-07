import { PhotoObject } from "../types";

type GetImageResults = {
  total: number;
  results: PhotoObject[];
};

export const getImage = async (
  query: string,
  page: number
): Promise<GetImageResults> => {
  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=50`,
    {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  const results = await res.json();

  if (results?.errors) {
    throw new Error(results.errors.join(". "));
  }

  return results;
};
