import type { RequestEventBase } from "@builder.io/qwik-city";
import { Md5 } from "ts-md5";
import type { DataWrapper, Character } from "~/types";
import { buildSearchParams, getOffset } from "~/utils";

export const getMarvelContext = (requestEvent: RequestEventBase) => {
  const baseURL = requestEvent.env.get("VITE_MARVEL_PUBLIC_BASE_URL");
  const publicApiKey = requestEvent.env.get("VITE_MARVEL_PUBLIC_API_KEY");
  const privateApiKey = requestEvent.env.get("VITE_MARVEL_PRIVATE_API_KEY");
  const ts = Date.now().toString();
  const hash = Md5.hashStr(ts + privateApiKey + publicApiKey);

  return {
    publicApiKey,
    privateApiKey,
    baseURL,
    ts,
    hash,
  };
};

type MarvelContext = ReturnType<typeof getMarvelContext>;

type FetchMarvelAPIArgs = {
  context: MarvelContext;
  path: string;
  query?: Partial<Record<string, string>>;
};

const fetchMarvelAPI = async <T = unknown>({
  context,
  path,
  query,
}: FetchMarvelAPIArgs): Promise<T> => {
  const params = buildSearchParams({
    apikey: context.publicApiKey,
    ts: context.ts,
    hash: context.hash,
    ...query,
  });

  const url = `${context.baseURL}/${path}?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error(url);
    throw new Error(
      `[fetchMarvelAPI] An error occurred: ${response.statusText}`,
    );
  }

  return response.json();
};

type GetCharactersArgs = {
  context: MarvelContext;
  page: number;
  limit: number;
  startsWith?: string;
};

export const getCharacters = async ({
  context,
  page,
  limit,
  startsWith,
}: GetCharactersArgs) =>
  await fetchMarvelAPI<DataWrapper<Character>>({
    context,
    path: "/characters",
    query: {
      offset: getOffset(page, limit),
      limit: String(limit),
      nameStartsWith: startsWith,
    },
  });
